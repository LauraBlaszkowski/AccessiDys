package com.example.collotl.accessidys;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;

import com.example.collotl.accessidys.R;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by collotl on 27/03/17.
 */

public class PopUpButton  extends DialogFragment {
    private GetUsers getter;
    private JSONObject jsonUser;
    private MainActivity main;

    public void set(GetUsers getter, JSONObject jsonUser, MainActivity main) {
        this.getter = getter;
        this.jsonUser=jsonUser;
        this.main=main;
    }

    @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            // Use the Builder class for convenient dialog construction
            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage("Supprimer cet utilisateur")
                    .setPositiveButton("Supprimer", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            try {
                                getter.delUsers(getter,main,(Integer)jsonUser.get("id"));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    })
                    .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                        }
                    });
            return builder.create();
        }
}

