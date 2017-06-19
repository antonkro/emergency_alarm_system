package com.example.tadel.myapplication;

import android.Manifest;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by tadel on 29.05.2017.
 */

public class WebAppInterface {
    Context mContext;
    public Location  lastLocation = null;
    private final LocationListener mLocationListener =  new LocationListener() {
            @Override
            public void onLocationChanged(final Location location) {
                lastLocation = location;
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
    };

    /** Instantiate the interface and set the context */
    WebAppInterface(Context c) {
        mContext = c;
        LocationManager mLocationManager = (LocationManager) mContext.getSystemService(Context.LOCATION_SERVICE);
        if (ActivityCompat.checkSelfPermission(mContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mContext, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.e("WebInterface","NO GPS Permission" );
        }
        mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000,
                10, mLocationListener);
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void safeData(String data) {
        SharedPreferences sharedPref = mContext.getSharedPreferences("personInNot", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("personInNot", data);
        editor.commit();
    }

    @JavascriptInterface
    public void safeDataKontakt(String data) {
        SharedPreferences sharedPref = mContext.getSharedPreferences("personInNot", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("personKontakt", data);
        editor.commit();
    }

    @JavascriptInterface
    public String getPersonenDaten() {
        SharedPreferences sharedPref = mContext.getSharedPreferences("personInNot", Context.MODE_PRIVATE);
        String personenDaten = sharedPref.getString("personInNot", null);
        return personenDaten;
    }

    @JavascriptInterface
    public String getNotfallKontakt() {
        SharedPreferences sharedPref = mContext.getSharedPreferences("personInNot", Context.MODE_PRIVATE);
        String personenDaten = sharedPref.getString("personKontakt", null);
        return personenDaten;
    }

    @JavascriptInterface
    public JSONObject getMyPosition() throws JSONException {
        JSONObject json = new JSONObject();
        json.put("lat", lastLocation.getLatitude());
        json.put("lng", lastLocation.getLongitude());
        return json;
    }
}
