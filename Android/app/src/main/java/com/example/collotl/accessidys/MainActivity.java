package com.example.collotl.accessidys;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

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
    private JSONArray jsonProf;
    private MainActivity main=this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TVNomUser= (TextView) findViewById(R.id.TVNomUser);
        spUsers= (Spinner) findViewById(R.id.spProfs);
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
                if (jsonA != null && jsonA.length() > 0) {
                    try {
                        int idUser = (Integer) ((JSONObject) jsonA.get(spUsers.getSelectedItemPosition())).get("id");
                        getter.getProfilsUser(main, idUser,false);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {}
        });

        Button orderButton = (Button)findViewById(R.id.btShowProf);
        orderButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               if(jsonA!=null && jsonA.length()>0 && jsonProf!=null && jsonProf.length()>0) {
                   Intent intent = new Intent(MainActivity.this, Profils.class);
                   intent.putExtra("json", jsonProf.toString());
                   startActivity(intent);
               }else
                   Toast.makeText(getApplicationContext(), "Pas de profils à afficher", Toast.LENGTH_LONG).show();
            }
        });

        getter =new GetUsers(this);
        getter.getUsers(getter,this);
    }

    public void doDelUser(View view) {
        if (jsonA != null && jsonA.length() > 0) {

            PopUpButton pop = new PopUpButton();

            JSONObject jsonOb = null;
            try {
                jsonOb = (JSONObject) this.jsonA.get(spUsers.getSelectedItemPosition());
            } catch (JSONException e) {
                e.printStackTrace();
            }

            pop.set(getter, jsonOb, this);
            pop.show(getFragmentManager(), "del user");
        }else
            Toast.makeText(getApplicationContext(), "Pas d'utilisateur à supprimer", Toast.LENGTH_LONG).show();
    }

    public void setUI(JSONArray jsonProfilsUser, boolean general){
        if(general)
            spUsers.setAdapter(this.setArray());

            TextView TVnbrUser = (TextView) findViewById(R.id.tvProf);
            TVnbrUser.setText("Il y a " + jsonA.length() + " utilisateurs différents.");

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
        this.jsonProf=jsonProfilsUser;

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