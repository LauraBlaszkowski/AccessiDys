package com.example.collotl.accessidys;

import android.content.Intent;
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

public class Profils extends AppCompatActivity {
    private JSONArray jsonProf;
    private Spinner spProfs;
    private TextView TVNomProf;
    private TextView TVPropProf;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        try {
            this.jsonProf=new JSONArray(intent.getStringExtra("json"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.v("json",intent.getStringExtra("json").toString());
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profils);

        spProfs= (Spinner) findViewById(R.id.spProfs);
        TVNomProf  = (TextView) findViewById(R.id.TVNomProf);
        TVPropProf = (TextView) findViewById(R.id.TVPropProf);

        spProfs.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                affichageUser(jsonProf);
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {}
        });

        spProfs.setAdapter(this.setArray());

        TextView TVnbrProf = (TextView) findViewById(R.id.TVnbrProf);
        TVnbrProf.setText("Il y a " + jsonProf.length() + " profils différents.");
    }

    private ArrayAdapter setArray(){
        ArrayAdapter<String> adUsers=new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);;
        ArrayList<String> strList=new ArrayList<>();
        for(int i = 0; i < this.jsonProf.length(); i++){
            JSONObject jsonOb=null;
            try {
                jsonOb=(JSONObject)this.jsonProf.get(i);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            try {
                strList.add("Profil n°"+jsonOb.get("id"));
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
            jsonOb=(JSONObject)this.jsonProf.get(spProfs.getSelectedItemPosition());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            TVNomProf.setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            TVNomProf.setText("-");
        }

        try {
            TVPropProf.setText(jsonOb.get("proprio").toString());
        } catch (JSONException e) {
            TVPropProf.setText("-");
        }
        Log.v("Prof", jsonOb.toString());
    }

    private void affichageUserVide(){
        TVNomProf.setText("-");
        TVPropProf.setText("-");
    }

}
