package com.example.collotl.accessidys;

import android.os.AsyncTask;
import android.widget.ArrayAdapter;

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

public class GetUsers extends AsyncTask<String, Void, String> {
        private JSONArray json=null;
        private ArrayAdapter<String> adUsers;

        @Override
        protected String doInBackground(String... urls) {
            System.setProperty("http.proxyHost","cache.univ-lille1.fr");
            System.setProperty("http.proxyPort","3128");

            HttpURLConnection urlConnection=null;
            try {
                URL url = new URL(urls[0]);
                urlConnection = (HttpURLConnection) url.openConnection();
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                return readStream(in);
            } catch (Exception e) {
                e.printStackTrace();
            }finally {
                urlConnection.disconnect();
            }
            return "Fail";
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
            json=null;
            try {
                json = new JSONArray(result);
            }catch (Exception e){
                e.printStackTrace();
            }

            ArrayList<String> strList=new ArrayList<>();
            for(int i = 0; i < json.length(); i++){
                strList.add("Utilisateur "+(i+1));
            }
            adUsers.addAll(strList);
        }

        JSONArray getJsonArray(){
            return json;
        }

        public ArrayAdapter<String> getAdUsers(android.content.Context context) {
            if(adUsers ==null)
                adUsers =new ArrayAdapter<String>(context, android.R.layout.simple_spinner_item);
            return adUsers;
        }

        @Override
        protected void onPreExecute() {}

        @Override
        protected void onProgressUpdate(Void... values) {}
}
