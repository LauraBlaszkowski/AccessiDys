package com.example.collotl.accessidys;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by collotl on 24/03/17.
 */

public class GetUsers {
    private android.content.Context context;
    private String urlServer="http://172.18.49.57:8080/v1/";
    private RequestQueue queue;

    GetUsers(android.content.Context context){
        this.context=context;
        this.queue= Volley.newRequestQueue(context);
        System.setProperty("http.proxyHost","cache.univ-lille1.fr");
        System.setProperty("http.proxyPort","3128");
    }

    public void getUsers(final GetUsers getter,final MainActivity main){
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlServer+"user",
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.v("getUsers Success",response);
                        try {
                            JSONArray js=new JSONArray(response);
                            main.setJsonA(js);
                            getter.getProfilsUser(main,(Integer)((JSONObject)js.get(0)).get("id"),true);
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(context, error.toString(), Toast.LENGTH_LONG).show();
                error.printStackTrace();
                if(error.getMessage()!=null)
                    Log.v("getUsers ERROR",error.getMessage());
            }
        });
        queue.add(stringRequest);
    }

    public void delUsers(final GetUsers getter, final MainActivity main, int id){
        StringRequest stringRequest = new StringRequest(Request.Method.DELETE, urlServer+"user/"+id,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.v("delUsers Success",response);
                        getter.getUsers(getter,main);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(context, error.toString(), Toast.LENGTH_LONG).show();
                error.printStackTrace();
                if(error.getMessage()!=null)
                    Log.v("delUsers ERROR",error.getMessage());
            }
        }){
            @Override
            public String getBodyContentType()
            {
                return "application/json; charset=utf-8";
            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> header = new HashMap<String, String>();
                header.put("Content-Type", "application/json; charset=utf-8");
                return header;
            }
        };
        queue.add(stringRequest);
    }

    public void getProfilsUser(final MainActivity main,int id, final boolean general){
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlServer+"profil/"+id,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.v("getProfilsUser Success",response);
                        try {
                            main.setUI(new JSONArray(response),general);
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(context, error.toString(), Toast.LENGTH_LONG).show();
                error.printStackTrace();
                if(error.getMessage()!=null)
                    Log.v("getProfilsUser ERROR",error.getMessage());
            }
        });
        queue.add(stringRequest);
    }
}