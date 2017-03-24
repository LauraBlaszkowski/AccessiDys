package com.example.collotl.accessidys;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.impl.bootstrap.HttpServer;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import static com.example.collotl.accessidys.R.id.TVNomUser;

public class MainActivity extends AppCompatActivity {
    private Spinner spUsers;
    private GetUsers getter;
    private TextView TVNomUser;
    private TextView TVPrenomUser;
    private TextView TVMdpUser;
    private TextView TVNbrProfUser;
    private TextView TVEmailUser;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TVNomUser= (TextView) findViewById(R.id.TVNomUser);
        spUsers= (Spinner) findViewById(R.id.spUsers);
        TVPrenomUser  = (TextView) findViewById(R.id.TVPrenomUser);
        TVMdpUser = (TextView) findViewById(R.id.TVMdpUser);
        TVNbrProfUser= (TextView) findViewById(R.id.TVNbrProfUser);
        TVEmailUser = (TextView) findViewById(R.id.TVEmailUser);

        TVEmailUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                        "mailto",TVEmailUser.getText().toString(), null));
                startActivity(Intent.createChooser(emailIntent, "Send email..."));
            }
        });

        spUsers.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                affichageUser();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        final TextView mTextView = (TextView) findViewById(R.id.textView7);

        getter =new GetUsers();
        getter.execute("http://172.18.49.57:8080/v1/user");
        spUsers.setAdapter(getter.getAdUsers(this));
        TextView TVnbrUser= (TextView) findViewById(R.id.tvUsers);
        TVnbrUser.setText("Il y a "+spUsers.getAdapter().getCount()+" utilisateurs différents.");
    }

    private void affichageUser(){
        JSONObject jsonOb=null;
        try {
            jsonOb=(JSONObject)getter.getJsonArray().get(spUsers.getSelectedItemPosition());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            TVNomUser.setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            TVNomUser.setText("-");
        }

        try {
            TVPrenomUser.setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            TVPrenomUser.setText("-");
        }

        try {
            TVEmailUser.setText(jsonOb.get("email").toString());
        } catch (JSONException e) {
            TVEmailUser.setText("-");
        }

        try {
            TVMdpUser.setText(jsonOb.get("password").toString());
        } catch (JSONException e) {
            TVMdpUser.setText("-");
        }

        try {
            TVNbrProfUser.setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            TVNbrProfUser.setText("-");
        }
        Log.v("User", jsonOb.toString());
    }
}

/*
  WebView browser = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = browser.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAppCacheMaxSize( 10 * 1024 * 1024 );
        //webSettings.setMixedContentMode(webSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        browser.setWebViewClient(new WebViewClient());

        browser.loadUrl("https://accessidys.org");
 */