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

public class MainActivity extends AppCompatActivity {
    private Spinner spUsers;
    private ArrayAdapter<String> adUsers;
    private Document doc;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        spUsers= (Spinner) findViewById(R.id.spUsers);
        adUsers=new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);

        final TextView TVEmailUser= (TextView) findViewById(R.id.TVEmailUser);
        TVEmailUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                        "mailto",TVEmailUser.getText().toString(), null));
                startActivity(Intent.createChooser(emailIntent, "Send email..."));
            }
        });

        ArrayList<String> strList=new ArrayList<>();
        for(int i = 0; i < 10; i++){
            strList.add("user"+i);
        }
        adUsers.addAll(strList);
        spUsers.setAdapter(adUsers);
        spUsers.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                TVEmailUser.setText(spUsers.getSelectedItem().toString()+"@gmail.com");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        TextView TVnbrUser= (TextView) findViewById(R.id.TVnbrUser);
        TVnbrUser.setText("Il y a "+adUsers.getCount()+" utilisateurs différents.");


        final TextView mTextView = (TextView) findViewById(R.id.textView7);

        GetUsers getter =new GetUsers();
        getter.execute("http://172.18.49.57:8080/v1/user");

    }

    private class GetUsers extends AsyncTask<String, Void, String> {
        String serverResponse="";

        @Override
        protected String doInBackground(String... urls) {
            System.setProperty("http.proxyHost","cache.univ-lille1.fr");
            System.setProperty("http.proxyPort","3128");


            HttpURLConnection urlConnection=null;
            try {
                URL url = new URL(urls[0]);
                urlConnection = (HttpURLConnection) url.openConnection();
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                this.serverResponse=readStream(in);
            } catch (Exception e) {
                e.printStackTrace();
            }finally {
                urlConnection.disconnect();
            }
            return "Executed";
        }

        private String readStream(InputStream in) {
            BufferedReader reader=null;
            StringBuilder total=new StringBuilder();
            try {
                 reader = new BufferedReader(new InputStreamReader(in));
                String line;
                while ((line = reader.readLine()) != null) {
                    total.append(line).append('\n');
                }
            }catch (Exception e){
                e.printStackTrace();
            }finally {
                try {
                    reader.close();
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
            return total.toString();

        }

        @Override
        protected void onPostExecute(String result) {
            TextView txt = (TextView) findViewById(R.id.textView7);
            txt.setText(result);
        }

        @Override
        protected void onPreExecute() {}

        @Override
        protected void onProgressUpdate(Void... values) {}
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