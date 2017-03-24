package com.example.collotl.accessidys;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by collotl on 24/03/17.
 */

public class GetUsers {
    private android.content.Context context;
    private String [] res=new String[1];

    GetUsers(android.content.Context context){
        this.context=context;
    }

    public void getUsers(MainActivity main){
        this.request(main);
    }

    private void request(final MainActivity main){
        RequestQueue queue = Volley.newRequestQueue(context);
        System.setProperty("http.proxyHost","cache.univ-lille1.fr");
        System.setProperty("http.proxyPort","3128");
        String url="http://172.18.49.57:8080/v1/user";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        res[0]=response;
                        Log.v("getUsers Success",res[0]);
                        try {
                            main.setUI(new JSONArray(res[0]));
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
                Log.v("getUsers ERROR",error.getMessage());
            }
        });
        queue.add(stringRequest);
    }
}