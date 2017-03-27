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
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private Spinner spUsers;
    private GetUsers getter;
    private TextView TVNomUser;
    private TextView TVPrenomUser;
    private TextView TVMdpUser;
    private TextView TVNbrProfUser;
    private TextView TVEmailUser;
    private JSONArray jsonA;
    private boolean first=true;
    private MainActivity main=this;

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
                try {
                    int idUser=(Integer)((JSONObject)jsonA.get(spUsers.getSelectedItemPosition())).get("id");
                    getter.getProfilsUser(main,idUser);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        final TextView mTextView = (TextView) findViewById(R.id.textView7);

        getter =new GetUsers(this);
        getter.getUsers(getter,this);
    }

    public void doDelUser(View view){
        JSONObject jsonOb=null;
        try {
            jsonOb=(JSONObject)this.jsonA.get(spUsers.getSelectedItemPosition());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            getter.delUsers(getter,this,(Integer)jsonOb.get("id"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void setUI(JSONArray jsonProfilsUser){
        if(first) {
            spUsers.setAdapter(this.setArray());
            TextView TVnbrUser = (TextView) findViewById(R.id.tvUsers);
            TVnbrUser.setText("Il y a " + spUsers.getAdapter().getCount() + " utilisateurs différents.");
            first=false;
        }
        if(jsonA.length()>0)
            this.affichageUser(jsonProfilsUser);
        else
            this.affichageUserVide();
    }

    private ArrayAdapter setArray(){
        ArrayAdapter<String> adUsers=new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);;
        ArrayList<String> strList=new ArrayList<>();
        for(int i = 0; i < this.jsonA.length(); i++){
            JSONObject jsonOb=null;
            try {
                jsonOb=(JSONObject)this.jsonA.get(i);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            try {
                strList.add("Utilisateur "+jsonOb.get("id"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        adUsers.addAll(strList);
        return adUsers;
    }

    private void affichageUser(JSONArray jsonProfilsUser){
        JSONObject jsonOb=null;
            try {
            jsonOb=(JSONObject)this.jsonA.get(spUsers.getSelectedItemPosition());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            TVNomUser.setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            TVNomUser.setText("-");
        }

        try {
            TVPrenomUser.setText(jsonOb.get("firstname").toString());
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

        TVNbrProfUser.setText(""+jsonProfilsUser.length());

        Log.v("User", jsonOb.toString());
    }

    private void affichageUserVide(){
        TVNomUser.setText("-");
        TVPrenomUser.setText("-");
        TVEmailUser.setText("-");
        TVMdpUser.setText("-");
        TVNbrProfUser.setText("-");
    }

    public void setJsonA(JSONArray jsonA) {
        this.jsonA = jsonA;
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