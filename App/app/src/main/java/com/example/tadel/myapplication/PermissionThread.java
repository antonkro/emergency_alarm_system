package com.example.tadel.myapplication;

import android.Manifest;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;

/**
 * Created by kro on 6/23/17.
 */

public class PermissionThread implements Runnable {
    private AppCompatActivity activity;
   public PermissionThread(AppCompatActivity activity) {
       this.activity=activity;
   }

    public void run() {
        ActivityCompat.requestPermissions(activity,new String[]{Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.RECORD_AUDIO},4);
        activity.recreate();

    }

}
