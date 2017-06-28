package org.zywx.wbpalmstar.plugin.uexuploadermgr;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.net.ssl.HttpsURLConnection;

import org.json.JSONException;
import org.json.JSONObject;
import org.zywx.wbpalmstar.base.BUtility;
import org.zywx.wbpalmstar.engine.EBrowserView;
import org.zywx.wbpalmstar.engine.universalex.EUExBase;
import org.zywx.wbpalmstar.engine.universalex.EUExCallback;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;

import com.yinhai.mdlife.http.HNetSSLSocketFactory;
import com.yinhai.mdlife.http.HX509HostnameVerifier;
import com.yinhai.mdlife.http.Http;

public class EUExUploaderMgr extends EUExBase {

	public static final String tag = "uexUploaderMgr_";
	private static final String F_CALLBACK_NAME_UPLOADSTATUS = "uexUploaderMgr.onStatus";
	private static final String F_CALLBACK_NAME_CREATEUPLOADER = "uexUploaderMgr.cbCreateUploader";

	public static final int F_FILE_TYPE_CREATE = 0;
	public static final int F_FILE_TYPE_UPLOAD = 1;

	public static final int TAG_MSG_CREATE = 1;
	public static final int TAG_MSG_UPLOAD = 2;
	public static final int TAG_MSG_CLOSE = 3;
	public static final int TAG_MSG_UPLOAD_MUILT = 4;

	static final String SCRIPT_HEADER = "javascript:";

	private static final int TIME_OUT = 30 * 1000; // 超时时间
	private static final String TAG_PARAMS_DATA = "data";
	private HashMap<Integer, EUExFormFile> objectMap;
	private HashMap<String, String> mHttpHead;
	private String mCertPassword = "";
	private String mCertPath = "";
	private boolean mHasCert = false;
	protected Handler mHandler;

	private static final String HEADER_CONTENT_TYPE = "Content-Type";

	private static final String BOUNDARY = "---------------------------7da2137580612"; // 数据分割线
	private static final String PREFIX = "--";
	private static final String LINEND = "\r\n";
	private static final String MULIIPART_FROM_DATA = "multipart/form-data";
	private static final String CHARSET = "UTF-8";

	public EUExUploaderMgr(Context context, EBrowserView inParent) {
		super(context, inParent);
		objectMap = new HashMap<Integer, EUExFormFile>();
		mHttpHead = new HashMap<String, String>();
		this.mHandler = super.mHandler;
	}

	public void createUploader(String[] parm) {
		if (parm == null || parm.length < 2) {
			errorCallback(0, 0, "error params!");
			return;
		}
		Message msg = new Message();
		msg.what = TAG_MSG_CREATE;
		msg.obj = this;
		Bundle bd = new Bundle();
		bd.putStringArray(TAG_PARAMS_DATA, parm);
		msg.setData(bd);
		mHandler.sendMessage(msg);
	}

	public void createUploaderMsg(String[] parm) {
		if (parm == null || parm.length < 2) {
			return;
		}
		String inOpCode = parm[0], inTargetAddress = parm[1];
		if (!BUtility.isNumeric(inOpCode)) {
			return;
		}
		if (objectMap.containsKey(Integer.parseInt(inOpCode))) {
			jsCallback(F_CALLBACK_NAME_CREATEUPLOADER,
					Integer.parseInt(inOpCode), EUExCallback.F_C_INT,
					EUExCallback.F_C_SUCCESS);
			return;
		}
		if (inTargetAddress == null
				|| inTargetAddress.length() == 0
				|| !(inTargetAddress.startsWith(BUtility.F_HTTP_PATH) || inTargetAddress
						.startsWith("https://"))) {
			jsCallback(F_CALLBACK_NAME_CREATEUPLOADER,
					Integer.parseInt(inOpCode), EUExCallback.F_C_INT,
					EUExCallback.F_C_FAILED);
			return;
		}

		objectMap.put(Integer.parseInt(inOpCode), new EUExFormFile(
				inTargetAddress, null));
		jsCallback(F_CALLBACK_NAME_CREATEUPLOADER, Integer.parseInt(inOpCode),
				EUExCallback.F_C_INT, EUExCallback.F_C_SUCCESS);
	}

	public void closeUploader(String[] parm) {
		if (parm == null || parm.length < 1) {
			errorCallback(0, 0, "error params!");
			return;
		}
		Message msg = new Message();
		msg.what = TAG_MSG_CLOSE;
		msg.obj = this;
		Bundle bd = new Bundle();
		bd.putStringArray(TAG_PARAMS_DATA, parm);
		msg.setData(bd);
		mHandler.sendMessage(msg);
	}

	public void closeUploaderMsg(String[] parm) {
		if (parm == null || parm.length < 1) {
			return;
		}
		String inOpCode = parm[0];
		if (!BUtility.isNumeric(inOpCode)) {
			return;
		}
		objectMap.remove(Integer.parseInt(inOpCode));
	}

	public void uploadFile(String[] parm) {
		if (parm == null || parm.length < 3) {
			errorCallback(0, 0, "error params!");
			return;
		}
		Message msg = new Message();
		msg.what = TAG_MSG_UPLOAD;
		msg.obj = this;
		Bundle bd = new Bundle();
		bd.putStringArray(TAG_PARAMS_DATA, parm);
		msg.setData(bd);
		mHandler.sendMessage(msg);
	}

	public void uploadFileMsg(String[] parm) {
		if (parm == null || parm.length < 3) {
			return;
		}
		final String inOpCode = parm[0];
		String inFilePath = parm[1];
		final String inInputName = parm[2];
		int inCompress = 0;
		if (parm.length == 4) {
			inCompress = Integer.parseInt(parm[3]);
		}
		float inWith = -1;
		if (parm.length == 5) {
			inCompress = Integer.parseInt(parm[3]);
			if (!TextUtils.isEmpty(parm[4])) {
				inWith = Float.valueOf(parm[4]).floatValue();
			}
		}
		if (!BUtility.isNumeric(inOpCode)) {
			return;
		}
		if (inFilePath == null || inFilePath.length() == 0) {
			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
					+ "," + 0 + "," + 0 + "," + "null,"
					+ EUExCallback.F_C_UpLoadError + ")}";
			onCallback(js);
			return;

		}
		if (mBrwView.getCurrentWidget() == null) {
			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
					+ "," + 0 + "," + 0 + "," + "null,"
					+ EUExCallback.F_C_UpLoadError + ")}";
			onCallback(js);
			return;
		}
		inFilePath = BUtility.makeRealPath(
				BUtility.makeUrl(mBrwView.getCurrentUrl(), inFilePath),
				mBrwView.getCurrentWidget().m_widgetPath,
				mBrwView.getCurrentWidget().m_wgtType);
		if (inFilePath.startsWith(BUtility.F_FILE_SCHEMA)) {
			inFilePath = inFilePath.substring(BUtility.F_FILE_SCHEMA.length());
		}
		final EUExFormFile formFile = objectMap.get(Integer.parseInt(inOpCode));
		if (formFile.state == F_FILE_TYPE_CREATE) {
			formFile.state = F_FILE_TYPE_UPLOAD;
		} else {
			return;
		}
		try {

			if (inFilePath.startsWith("/")) {
				File file = new File(inFilePath);
				if (!file.exists()) {
					String js = SCRIPT_HEADER + "if("
							+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
							+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
							+ "," + 0 + "," + 0 + "," + "null,"
							+ EUExCallback.F_C_UpLoadError + ")}";
					onCallback(js);
					return;
				}
				InputStream inputSteam = null;
				if (inCompress > 0) {
					try {
						inputSteam = compress(mContext, inFilePath, inCompress,
								inWith);
					} catch (OutOfMemoryError e) {
						String js = SCRIPT_HEADER + "if("
								+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
								+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
								+ "," + 0 + "," + 0 + "," + "null,"
								+ EUExCallback.F_C_UpLoadError + ")}";
						onCallback(js);
						e.printStackTrace();
						return;
					} catch (IOException e) {
						String js = SCRIPT_HEADER + "if("
								+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
								+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
								+ "," + 0 + "," + 0 + "," + "null,"
								+ EUExCallback.F_C_UpLoadError + ")}";
						onCallback(js);
						e.printStackTrace();
						return;
					}

				} else {
					inputSteam = new FileInputStream(file);
				}

				formFile.setInputStream(inputSteam);
				formFile.m_filname = file.getName();
			} else {
				InputStream inputSteam = null;
				if (inCompress > 0) {
					try {
						inputSteam = compress(mContext, inFilePath, inCompress,
								inWith);
					} catch (OutOfMemoryError e) {
						String js = SCRIPT_HEADER + "if("
								+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
								+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
								+ "," + 0 + "," + 0 + "," + "null,"
								+ EUExCallback.F_C_UpLoadError + ")}";
						onCallback(js);
						e.printStackTrace();
						return;
					} catch (IOException e) {
						String js = SCRIPT_HEADER + "if("
								+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
								+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
								+ "," + 0 + "," + 0 + "," + "null,"
								+ EUExCallback.F_C_UpLoadError + ")}";
						onCallback(js);
						e.printStackTrace();
						return;
					}

				} else {
					inputSteam = mContext.getAssets().open(inFilePath);
				}

				formFile.setInputStream(inputSteam);
				formFile.m_filname = inFilePath.substring(inFilePath
						.lastIndexOf("/") + 1);
			}

			final UploadPercentage uploadPercentage = new UploadPercentage();

			new Thread("SoTowerMobile-uexUpload") {
				public void run() {
					Uploader(formFile, uploadPercentage,
							Integer.parseInt(inOpCode), inInputName);
				}
			}.start();
		} catch (Exception e) {
			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
					+ "," + 0 + "," + 0 + "," + "null,"
					+ EUExCallback.F_C_UpLoadError + ")}";
			onCallback(js);
			e.printStackTrace();
		}
	}

	@SuppressWarnings("resource")
	private String Uploader(EUExFormFile formFile,
			UploadPercentage uploadPercentage, int inOpCode, String inInputName) {

		InputStream is = null;
		DataOutputStream outStream = null;
		HttpURLConnection conn = null;

		try {

			if (formFile != null) {
				if (formFile.m_inputStream == null) {
					String js = SCRIPT_HEADER + "if("
							+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
							+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
							+ "," + 0 + "," + 0 + "," + "null,"
							+ EUExCallback.F_C_UpLoadError + ")}";
					onCallback(js);
					return null;
				}
				if (inInputName == null || inInputName.length() == 0) {
					inInputName = "file";
				}
				String CONTENT_TYPE = "multipart/form-data"; // 内容类型

				URL url = new URL(formFile.getM_targetAddress());
				if (formFile.getM_targetAddress().startsWith(
						BUtility.F_HTTP_PATH)) {
					conn = (HttpURLConnection) url.openConnection();
				} else {
					conn = (HttpsURLConnection) url.openConnection();
					javax.net.ssl.SSLSocketFactory ssFact = null;
					if (mHasCert) {
						ssFact = Http.getSSLSocketFactoryWithCert(
								mCertPassword, mCertPath, mContext);
					} else {
						ssFact = new HNetSSLSocketFactory(null, null);
					}
					((HttpsURLConnection) conn).setSSLSocketFactory(ssFact);
					((HttpsURLConnection) conn)
							.setHostnameVerifier(new HX509HostnameVerifier());
				}
				String cookie = getCookie(formFile.getM_targetAddress());
				if (null != cookie) {
					conn.setRequestProperty("Cookie", cookie);
				}
				conn.setReadTimeout(TIME_OUT);
				conn.setConnectTimeout(TIME_OUT);
				conn.setDoInput(true); // 允许输入流
				conn.setDoOutput(true); // 允许输出流
				conn.setUseCaches(false); // 不允许使用缓存
				conn.setRequestMethod("POST"); // 请求方式
				conn.setRequestProperty("Charset", CHARSET); // 设置编码
				conn.setRequestProperty("connection", "keep-alive");
				conn.setRequestProperty("Content-Type", CONTENT_TYPE
						+ ";boundary=" + BOUNDARY);
				addHeaders(conn);
				/**
				 * 当文件不为空，把文件包装并且上传
				 */
				DataOutputStream dos = new DataOutputStream(
						conn.getOutputStream());
				StringBuffer sb = new StringBuffer();
				sb.append(PREFIX);
				sb.append(BOUNDARY);
				sb.append(LINEND);
				/**
				 * 这里重点注意： name里面的值为服务器端需要key 只有这个key 才可以得到对应的文件
				 * filename是文件的名字，包含后缀名的 比如:abc.png
				 */

				sb.append("Content-Disposition: form-data; name=\""
						+ inInputName + "\"; filename=\"" + formFile.m_filname
						+ "\"" + LINEND);
				sb.append("Content-Type: application/octet-stream; charset="
						+ CHARSET + LINEND);
				sb.append(LINEND);
				dos.write(sb.toString().getBytes());
				is = formFile.m_inputStream;
				// int l;
				int upload = 0;
				int fileSize = is.available();
				uploadPercentage.setFileSize(fileSize, inOpCode);
				byte[] bytes = new byte[4096];
				int len = 0;
				try {
					while ((len = is.read(bytes)) != -1) {
						dos.write(bytes, 0, len);
						upload += len;
						uploadPercentage.sendMessage(upload);
					}
				} catch (OutOfMemoryError e) {
					String js = SCRIPT_HEADER + "if("
							+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
							+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
							+ "," + 0 + "," + 0 + "," + "null,"
							+ EUExCallback.F_C_UpLoadError + ")}";
					onCallback(js);
					return null;
				}

				dos.write(LINEND.getBytes());
				byte[] end_data = (PREFIX + BOUNDARY + PREFIX + LINEND)
						.getBytes();
				dos.write(end_data);

				int res = conn.getResponseCode();

				if (res == 200) {
					String js = SCRIPT_HEADER + "if("
							+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
							+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
							+ "," + uploadPercentage.fileSize + "," + 100 + ","
							+ "null," + EUExCallback.F_C_UpLoading + ")}";
					onCallback(js);
					is = conn.getInputStream();
					int ch;
					StringBuilder b = new StringBuilder();
					while ((ch = is.read()) != -1) {
						b.append((char) ch);
					}

					js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
							+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "("
							+ inOpCode + "," + uploadPercentage.fileSize + ","
							+ 100 + ",'" + BUtility.transcoding(b.toString())
							+ "'," + EUExCallback.F_C_FinishUpLoad + ")}";
					onCallback(js);

				} else {
					String js = SCRIPT_HEADER + "if("
							+ F_CALLBACK_NAME_UPLOADSTATUS + "){"
							+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
							+ "," + 0 + "," + 0 + "," + "null,"
							+ EUExCallback.F_C_UpLoadError + ")}";
					onCallback(js);
				}

				is.close();
				dos.flush();
				dos.close();
				formFile.m_isUpLoaded = true;
			}

		} catch (MalformedURLException e) {
			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
					+ "," + 0 + "," + 0 + "," + "null,"
					+ EUExCallback.F_C_UpLoadError + ")}";
			onCallback(js);
			e.printStackTrace();
		} catch (Exception e) {
			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + inOpCode
					+ "," + 0 + "," + 0 + "," + "null,"
					+ EUExCallback.F_C_UpLoadError + ")}";
			onCallback(js);
			e.printStackTrace();
		} finally {

			try {
				if (is != null) {
					is.close();
				}
				if (outStream != null) {
					outStream.close();
				}
				if (conn != null) {
					conn.disconnect();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			is = null;
			outStream = null;
			conn = null;
		}

		return null;
	}

	private void addHeaders(HttpURLConnection mConnection) {
		if (null != mConnection) {
			Set<Entry<String, String>> entrys = mHttpHead.entrySet();
			for (Map.Entry<String, String> entry : entrys) {
				mConnection
						.setRequestProperty(entry.getKey(), entry.getValue());
			}
		}
	}

	public class UploadPercentage {
		int fileSize;
		int opCode = 0;
		String uploadPercentage = null;
		String callBack = null;
		DecimalFormat df = new DecimalFormat();

		public void setFileSize(int inFileSize, int inOpCode) {
			fileSize = inFileSize;
			df.setMaximumFractionDigits(2);
			df.setMinimumFractionDigits(0);
			opCode = inOpCode;
		}

		public void sendMessage(int msg) {
			String percentage = "0";
			if (fileSize * 100 < 0) {
				percentage = df.format(msg / (fileSize / 100));
			} else {
				percentage = df.format(msg * 100 / fileSize);
			}
			if(percentage.equals("100")){
				percentage = "99";
			}

			String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS
					+ "){" + F_CALLBACK_NAME_UPLOADSTATUS + "(" + opCode + ","
					+ fileSize + "," + percentage + "," + "null,"
					+ EUExCallback.F_C_UpLoading + ")}";
			onCallback(js);

		}
	}

	public void setHeaders(String[] params) {
		if (params.length < 2 || null == params) {
			return;
		}
		String opCode = params[0];
		String headJson = params[1];
		if (objectMap.get(Integer.parseInt(opCode)) != null) {
			try {
				JSONObject json = new JSONObject(headJson);
				Iterator<?> keys = json.keys();
				mHttpHead.clear();
				while (keys.hasNext()) {
					String key = (String) keys.next();
					String value = json.getString(key);
					mHttpHead.put(key, value);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	@Override
	protected boolean clean() {
		return false;
	}

	private InputStream compress(Context m_eContext, String path, int compress,
			float with) throws OutOfMemoryError, IOException {
		FileDescriptor fileDescriptor = null;
		boolean isRes = false;
		if (!path.startsWith("/")) {
			AssetFileDescriptor assetFileDescriptor = m_eContext.getAssets()
					.openFd(path);
			fileDescriptor = assetFileDescriptor.getFileDescriptor();
			isRes = true;
		} else {
			@SuppressWarnings("resource")
			FileInputStream fis = new FileInputStream(new File(path));
			fileDescriptor = fis.getFD();
		}
		BitmapFactory.Options options = new BitmapFactory.Options();
		options.inJustDecodeBounds = true;
		Bitmap source = BitmapFactory.decodeFileDescriptor(fileDescriptor,
				null, options);
		if (options.outHeight <= 0 || options.outWidth <= 0) {
			if (isRes) {
				return m_eContext.getAssets().open(path);
			} else {
				return new FileInputStream(new File(path));
			}

		}

		int quality = 0;
		if (compress == 1) {
			quality = 100;
		} else if (compress == 2) {
			quality = 75;
		} else if (compress == 3) {
			quality = 50;
		} else {
			quality = 25;
		}

		float max = with == -1 ? 640 : with;
		float src_w = options.outWidth;
		float scaleRate = 1;

		scaleRate = src_w / max;

		scaleRate = scaleRate > 1 ? scaleRate : 1;

		if (scaleRate != 1) {
			Bitmap dstbmp = null;
			ByteArrayOutputStream baos = new ByteArrayOutputStream(4096);
			options.inSampleSize = (int) scaleRate;
			options.inJustDecodeBounds = false;
			options.inInputShareable = true;
			options.inPurgeable = true;
			options.inPreferredConfig = Config.RGB_565;// 会失真，缩略图失真没事^_^

			source = BitmapFactory.decodeFileDescriptor(fileDescriptor, null,
					options);
			if (source != null) {
				int srcWidth = source.getWidth();
				int srcHeight = source.getHeight();
				final float sacleRate = max / (float) srcWidth;
				if (sacleRate != 1) {
					final int destWidth = (int) (srcWidth * sacleRate);
					final int destHeight = (int) (srcHeight * sacleRate);
					dstbmp = Bitmap.createScaledBitmap(source, destWidth,
							destHeight, false);
					if (source != null && !source.isRecycled()) {
						source.recycle();
					}
				} else {
					dstbmp = source;
				}
				if (dstbmp.compress(CompressFormat.JPEG, quality, baos)) {
					if (dstbmp != null && !dstbmp.isRecycled()) {
						dstbmp.recycle();
					}
					return new ByteArrayInputStream(baos.toByteArray());
				} else {
					baos.close();
					if (isRes) {
						return m_eContext.getAssets().open(path);
					} else {
						return new FileInputStream(new File(path));
					}
				}
			} else {
				if (isRes) {
					return m_eContext.getAssets().open(path);
				} else {
					return new FileInputStream(new File(path));
				}
			}

		} else {
			if (isRes) {
				return m_eContext.getAssets().open(path);
			} else {
				return new FileInputStream(new File(path));
			}
		}

	}

	@Override
	public void onHandleMessage(Message msg) {
		if (msg == null) {
			return;
		}
		String[] params = msg.getData().getStringArray(TAG_PARAMS_DATA);
		switch (msg.what) {
		case TAG_MSG_CREATE:
			createUploaderMsg(params);
			break;
		case TAG_MSG_UPLOAD:
			uploadFileMsg(params);
			break;
		case TAG_MSG_UPLOAD_MUILT:
			uploadMuilFilesMsg(params);
			break;
		case TAG_MSG_CLOSE:
			closeUploaderMsg(params);
		default:
			break;
		}
	}

	/**
	 * 多文件上传
	 * 
	 * @param params
	 */
	public void uploadMuiltFiles(String[] parm) {
		if (parm == null || parm.length < 2) {
			errorCallback(0, 0, "error params!");
			return;
		}
		Message msg = new Message();
		msg.what = TAG_MSG_UPLOAD_MUILT;
		msg.obj = this;
		Bundle bd = new Bundle();
		bd.putStringArray(TAG_PARAMS_DATA, parm);
		msg.setData(bd);
		mHandler.sendMessage(msg);
	}

	/**
	 * 多文件上传
	 * 
	 * @param params
	 */
	private void uploadMuilFilesMsg(String[] parm) {
		if (parm == null || parm.length < 2) {
			return;
		}
		final String inOpCode = parm[0];
		String datas = parm[1];
		if (!BUtility.isNumeric(inOpCode)) {
			return;
		}
		try {
			JSONObject obj = new JSONObject(datas);
			JSONObject objData = null;
			JSONObject objFiles = null;
			if (obj.has("dataParam")) {
				objData = obj.getJSONObject("dataParam");
			}
			if (obj.has("fileParam")) {
				objFiles = obj.getJSONObject("fileParam");
			}
			final HashMap<String, String> dataParam = encodeUploadParams(objData);
			final HashMap<String, String> fileParam = encodeUploadParams(objFiles);
			final HashMap<String, String> realFilePath = new HashMap<String, String>();
			for (String key : fileParam.keySet()) {
				realFilePath.put(key, createPath(fileParam.get(key)));
			}
			String url = objectMap.get(Integer.valueOf(inOpCode))
					.getM_targetAddress();
			StringBuilder sb = new StringBuilder();
			sb.append(url).append("?");
			for(String key : dataParam.keySet()){
				sb.append(key).append("=");
				sb.append(URLEncoder.encode(dataParam.get(key), CHARSET));
//				sb.append(dataParam.get(key));
				sb.append("&");
			}
			URL parsedUrl = new URL(sb.toString());
			final HttpURLConnection con = openConnection(parsedUrl);
			addHeaders(con);
			final UploadPercentage uploadPercentage = new UploadPercentage();
			new Thread() {
				public void run() {

					uploadMuilt(con, dataParam, realFilePath, inOpCode,
							uploadPercentage);
				};
			}.start();

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			uploadErrorCallBack(inOpCode, "上传参数格式错误");
			return;
		} catch (IOException e) {
			uploadErrorCallBack(inOpCode, "文件上传出错");
			return;
		}
	}

	/**
	 * 将json参数转化为map对象
	 * 
	 * @param json
	 * @return
	 */
	private HashMap<String, String> encodeUploadParams(JSONObject json) {
		HashMap<String, String> params = new HashMap<String, String>();
		if (json == null)
			return params;
		Iterator<?> keys = json.keys();
		try {
			while (keys.hasNext()) {
				String key = (String) keys.next();
				String value = json.getString(key);
				params.put(key, value);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return params;

	}

	/**
	 * 上传
	 * 
	 * @param con
	 * @param datas
	 * @param files
	 * @param inOpcode
	 */
	private void uploadMuilt(HttpURLConnection con,
			HashMap<String, String> datas, HashMap<String, String> files,
			String inOpcode, UploadPercentage uploadPercentage) {
		try {
			addFileBody(con, datas, files, inOpcode, uploadPercentage);
			int rspcode = con.getResponseCode();
			if (rspcode == 200) { // 上传成功
				InputStream is = con.getInputStream();
				String rs = inputStream2String(is);
				uploadSucessCallBack(inOpcode, rs);
			} else {
				uploadErrorCallBack(inOpcode, "上传出错");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @param is
	 * @return
	 */
	private String inputStream2String(InputStream is) {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int len = -1;
			while ((len = is.read(buffer)) != -1) {
				bos.write(buffer, 0, len);
			}
			return new String(bos.toByteArray(), "UTF-8");
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
				}
			}
		}
		return "";
	}

	/**
	 * 
	 * @param url
	 * @return
	 * @throws IOException
	 */
	private HttpURLConnection openConnection(URL url) throws IOException {
		HttpURLConnection connection = createConnection(url);
		connection.setConnectTimeout(TIME_OUT);
		connection.setReadTimeout(TIME_OUT);
		connection.setDoInput(true); // 允许输入流
		connection.setDoOutput(true); // 允许输出流
		connection.setUseCaches(false); // 不允许使用缓存
		connection.setRequestMethod("POST"); // 请求方式
		connection.setRequestProperty("Connection", "keep-alive");
		connection.setRequestProperty("Charset", CHARSET);
		return connection;
	}

	protected HttpURLConnection createConnection(URL url) throws IOException {
		return (HttpURLConnection) url.openConnection();
	}

	/*
	 * 上传失败
	 */
	private void uploadErrorCallBack(String inOpCode, String msg) {
		int opCode = Integer.valueOf(inOpCode);
		String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS + "){"
				+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + opCode + "," + 0 + ","
				+ 0 + ",'" + msg + "'," + EUExCallback.F_C_UpLoadError + ")}";
		onCallback(js);
	}

	/**
	 * 上传成功
	 * 
	 * @param inOpCode
	 * @param msg
	 */
	private void uploadSucessCallBack(String inOpCode, String msg) {
		int opCode = Integer.valueOf(inOpCode);
		String js = SCRIPT_HEADER + "if(" + F_CALLBACK_NAME_UPLOADSTATUS + "){"
				+ F_CALLBACK_NAME_UPLOADSTATUS + "(" + opCode + "," + 0 + ","
				+ 100 + ",'" + msg + "'," + EUExCallback.F_C_FinishUpLoad + ")}";
		onCallback(js);
	}

	/**
	 * 文件路径统一配置
	 * 
	 * @param filePath
	 * @return
	 */
	private String createPath(String filePath) {
		String inFilePath = BUtility.makeRealPath(
				BUtility.makeUrl(mBrwView.getCurrentUrl(), filePath),
				mBrwView.getCurrentWidget().m_widgetPath,
				mBrwView.getCurrentWidget().m_wgtType);
		if (inFilePath.startsWith(BUtility.F_FILE_SCHEMA)) {
			inFilePath = inFilePath.substring(BUtility.F_FILE_SCHEMA.length());
		}
		return inFilePath;
	}

	/**
	 * 创建输入流
	 * 
	 * @param filePath
	 * @param inOpcode
	 * @return
	 */
	private InputStream createInputStream(String inFilePath, String inOpcode) {
		InputStream inputSteam = null;
		if (inFilePath.startsWith("/")) {
			File file = new File(inFilePath);
			if (!file.exists()) {
				uploadErrorCallBack(inOpcode, "文件不存在");
				return null;
			}
			try {
				inputSteam = new FileInputStream(new File(inFilePath));
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			try {
				inputSteam = mContext.getAssets().open(inFilePath);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return inputSteam;
	}

	private void addFileBody(HttpURLConnection connection,
			HashMap<String, String> datas, HashMap<String, String> fileparms,
			String opCode, UploadPercentage uploadPercentage) {
		try {
			connection.setChunkedStreamingMode(10240); 
			connection.setRequestProperty(HEADER_CONTENT_TYPE,
					MULIIPART_FROM_DATA + ";boundary=" + BOUNDARY);
			BufferedOutputStream dos = new BufferedOutputStream(
					connection.getOutputStream());
			// post data
	/*		if (datas != null) {
				StringBuilder sbData = new StringBuilder();
				for (String key : datas.keySet()) {
					sbData.append(PREFIX).append(BOUNDARY).append(LINEND);
					sbData.append("Content-Disposition: form-data; name=")
							.append(key);
					sbData.append(LINEND).append(LINEND);
					sbData.append(datas.get(key));
					sbData.append(LINEND);
				}
				dos.write(sbData.toString().getBytes());
			}*/

			// 获得文件的总大小
			int allSize = 0;
			for (String fileName : fileparms.keySet()) {
				File f = new File(fileparms.get(fileName));
				if (f.exists()) {
					allSize += f.length();
				}
			}
			uploadPercentage.setFileSize(allSize, Integer.valueOf(opCode));
			int postsize = 0; // 上传文件大小
			// post file
			if (fileparms != null) {
				for (String fileName : fileparms.keySet()) {
					if(TextUtils.isEmpty(fileName)){
						continue;
					}
					InputStream is = createInputStream(fileparms.get(fileName),
							opCode);
					if (is == null){
						uploadErrorCallBack(opCode, fileparms.get(fileName)+"文件不存在");
						continue;
					}
						
					StringBuilder sb = new StringBuilder();
					sb.append(PREFIX).append(BOUNDARY).append(LINEND);
					sb.append("Content-Disposition: form-data; name=")
							.append(fileName).append(";");
					String path = fileparms.get(fileName);
					String fname = path.substring(path.lastIndexOf("/")+1);
					sb.append("filename=").append(fname);
					sb.append(LINEND);
					sb.append("Content-Type: application/octet-stream");
					sb.append(LINEND).append(LINEND);
					dos.write(sb.toString().getBytes());
					BufferedInputStream bis = new BufferedInputStream(is);
					byte[] buffer = new byte[2048];
					int len = -1;
					while ((len = bis.read(buffer)) != -1) {
						postsize += len;
						uploadPercentage.sendMessage(postsize);
						dos.write(buffer, 0, len);
					}
					bis.close();
					dos.write(LINEND.getBytes());
				}
				byte[] end_data = (PREFIX + BOUNDARY + PREFIX + LINEND)
						.getBytes();
				dos.write(end_data);
				dos.close();
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
