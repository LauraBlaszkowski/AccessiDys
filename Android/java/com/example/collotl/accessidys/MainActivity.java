package com.example.collotl.accessidys;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private Spinner spUsers;
    private ArrayAdapter<String> adUsers;

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