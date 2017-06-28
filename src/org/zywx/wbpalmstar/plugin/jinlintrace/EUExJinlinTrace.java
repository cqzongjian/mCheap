package org.zywx.wbpalmstar.plugin.jinlintrace;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;

import org.zywx.wbpalmstar.base.BUtility;
import org.zywx.wbpalmstar.base.ResoureFinder;
import org.zywx.wbpalmstar.engine.EBrowserView;
import org.zywx.wbpalmstar.engine.universalex.EUExBase;
import org.zywx.wbpalmstar.engine.universalex.EUExCallback;
import org.zywx.wbpalmstar.widgetone.WidgetOneApplication;
import org.zywx.wbpalmstar.widgetone.dataservice.WWidgetData;


import android.content.Context;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

/**
 * 轨迹服务插件
 * 
 * @author chenhan
 *
 */
public class EUExJinlinTrace extends EUExBase {

	private final static String CB_INIT = "uexJinlinTrace.cbInit";
	private final static String ON_RECEIVElOCATION = "uexJinlinTrace.onReceiveLocation";

	private final static String CB_STARTLOCATION = "uexJinlinTrace.cbStartLocation";
	
	private final static String CB_QUERYHISTORYTRACE = "uexJinlinTrace.cbQueryHistoryTrace";
	private final static String CB_STOPLOCATION = "uexJinlinTrace.cbStopLocation";

	public static final String onFunction = "uexJinlinTrace.onChange";
	private final static String CB_OPENLOCATION = "uexJinlinTrace.cbOpenLocation";

	private static final String CB_FILEZIP = "uexJinlinTrace.cbFileZip";
	private static final String CB_WRITEFILE = "uexJinlinTrace.cbWriteFile";


	private LocationCallback mLCallback;
	


	public EUExJinlinTrace(Context context, EBrowserView inParent) {
		super(context, inParent);

		mLCallback = new LocationCallback() {

			@Override
			public void onLocation(double lat, double log, float radius) {
				String js = SCRIPT_HEADER + "if(" + onFunction + "){" + onFunction + "(" + lat + "," + log + ","
						+ radius + ");}";
				mBrwView.loadUrl(js);
			}
		};
	}

	@Override
	public boolean clean() {
		BaiduLocation bdl = BaiduLocation.get(mContext);
		bdl.closeLocation(mLCallback);
		return true;
	}


	/**
	 * 获取坐标经纬度
	 */
	public void openLocation(String[] params) {
		if (!checkSetting()) {
			jsCallback(CB_OPENLOCATION, 0, EUExCallback.F_C_INT, EUExCallback.F_C_FAILED);
			return;
		} else {
			jsCallback(CB_OPENLOCATION, 0, EUExCallback.F_C_INT, EUExCallback.F_C_SUCCESS);
		}

		BaiduLocation bdl = BaiduLocation.get(mContext);
		bdl.openLocation(mLCallback);
	}


	public void closeLocation(String[] parm) {
		BaiduLocation bdl = BaiduLocation.get(mContext);
		bdl.closeLocation(mLCallback);
	}


	/**
	 * 检查网络是否可用
	 * 
	 * @return
	 */
	private boolean checkSetting() {
		try {
			LocationManager lm = (LocationManager) mContext.getSystemService(Context.LOCATION_SERVICE);
			boolean gpsEnable = lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
			boolean netEnable = lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

			ConnectivityManager cm = (ConnectivityManager) mContext.getSystemService(Context.CONNECTIVITY_SERVICE);
			NetworkInfo networkInfos = cm.getActiveNetworkInfo();
			boolean net = false;
			boolean wifi = false;
			if (networkInfos != null) {
				net = networkInfos.getState() == NetworkInfo.State.CONNECTED;
				wifi = networkInfos.getType() == ConnectivityManager.TYPE_WIFI;
			}
			return gpsEnable || netEnable || net || wifi;
		} catch (Exception e) {
			;
		}
		return false;
	}
	


}
