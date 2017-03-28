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
            ((TextView) findViewById(R.id.TVNomProf)).setText(jsonOb.get("name").toString());
        } catch (JSONException e) {
            ((TextView) findViewById(R.id.TVNomProf)).setText("-");
        }

        try {
            ((TextView) findViewById(R.id.TVDescr)).setText(jsonOb.get("description").toString());
        } catch (JSONException e) {
            ((TextView) findViewById(R.id.TVDescr)).setText("-");
        }
        Log.v("Prof", jsonOb.toString());
    }

    private void affichageUserVide(){
        ((TextView) findViewById(R.id.TVNomProf)).setText("-");
        ((TextView) findViewById(R.id.TVDescr)).setText("-");
    }
}
