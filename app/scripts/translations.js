angular.module("gettext").run(['gettextCatalog', function(gettextCatalog) {
	gettextCatalog.setStrings('en_US', {
		"Accueil": "Home",
		"Action": "Action",
		"Ajouter": "Add",
		"Ajouter un profil": "New profil",
		"Annuler": "Cancel",
		"CNED": "CNED",
		"Descriptif": "Description",
		"Documents": "Documents",
		"Dupliquer le profil": "Clone profil",
		"Enregistrer": "Save",
		"Entrez le descriptif": "Tape the description",
		"Entrez le nom": "Tape the name",
		"Gestion des profils": "Manage profils",
		"Interligne": "line spacing",
		"Mes profils :": "Manage profils :",
		"Modifier le profil": "Edit profil",
		"Modifier les informations": "Edit data",
		"Niveau scolaire": "Level of qualification",
		"Nom": "Name",
		"Paramètres": "Settings",
		"Partager": "Share",
		"Police": "Font",
		"Profils": "Profils",
		"Style": "Style",
		"Supprimer": "Delete",
		"Supprimer le profil": "Delete profil",
		"Taille": "Size",
		"Type": "Type",
		"Valider": "Submit",
		"Voir un aperçu": "Preview",
		"Vous êtes sur le point de supprimer le profil ?": "Do you really want deleting the profil ?",
		"modifié avec succès": "successfully changed",
		"stylé avec succès": "successfully styled"
	});
	gettextCatalog.setStrings('fr_FR', {
		"<span class=\"glyphicon glyphicon-search\"></span> Action": "<span class=\"glyphicon glyphicon-search\"></span> Action",
		"<span class=\"label label-info\">                <i class=\"fa fa-check-circle\">                </i> {{var.tagName}} modifié avec succès                <button type=\"button\" class=\"btn label-info btn-xs\" ng-click=\"editionSupprimerTag(var)\">                  <i class=\"fa fa-trash-o\">                  </i>                </button>              </span>": "<span class=\"label label-info\">                <i class=\"fa fa-check-circle\">                </i> {{var.tagName}} modifié avec succès                <button type=\"button\" class=\"btn label-info btn-xs\" ng-click=\"editionSupprimerTag(var)\">                  <i class=\"fa fa-trash-o\">                  </i>                </button>              </span>",
		"<span class=\"label label-info\">            <i class=\"fa fa-check-circle\">            </i> {{var.label}} stylé avec succès            <button type=\"button\" class=\"btn label-info btn-xs\" ng-click=\"ajoutSupprimerTag(var)\">              <i class=\"fa fa-trash-o\" ng-click=\"editerTag()\">              </i>            </button>          </span>": "<span class=\"label label-info\">            <i class=\"fa fa-check-circle\">            </i> {{var.label}} stylé avec succès            <button type=\"button\" class=\"btn label-info btn-xs\" ng-click=\"ajoutSupprimerTag(var)\">              <i class=\"fa fa-trash-o\" ng-click=\"editerTag()\">              </i>            </button>          </span>",
		"Accueil": "Accueil",
		"Action": "Action",
		"Ajouter": "Ajouter",
		"Ajouter un profil": "Ajouter un profil",
		"Annuler": "Annuler",
		"CNED": "CNED",
		"Descriptif": "Descriptif",
		"Descriptif <span class=\"required\">*</span>": "Descriptif <span class=\"required\">*</span>",
		"Documents": "Documents",
		"Dupliquer le profil": "Dupliquer le profil",
		"Enregistrer": "Enregistrer",
		"Entrez le descriptif": "Entrez la description",
		"Entrez le nom": "Entrez le nom",
		"Gestion des profils": "Gestion des profils",
		"Interligne": "Interligne",
		"Mes profils  :  <span class=\"label label-primary\">{{listeProfils.length}}</span>": "Mes profils  :  <span class=\"label label-primary\">{{listeProfils.length}}</span>",
		"Modifier le profil": "Modifier le profil",
		"Modifier les informations": "Modifier les informations",
		"Niveau scolaire": "Niveau scolaire",
		"Niveau scolaire <span class=\"required\">*</span>": "Niveau scolaire <span class=\"required\">*</span>",
		"Nom": "Nom",
		"Nom <span class=\"required\">*</span>": "Nom <span class=\"required\">*</span>",
		"Paramètres": "Paramètres",
		"Partager": "Partager",
		"Police": "Police",
		"Profils": "Profils",
		"Style": "Style",
		"Supprimer": "Supprimer",
		"Supprimer le profil": "Supprimer le profil",
		"Taille": "Taille",
		"Type": "Type",
		"Type <span class=\"required\">*</span>": "Type <span class=\"required\">*</span>",
		"Valider": "Valider",
		"Voir un aperçu": "Voir un aperçu",
		"Vous êtes sur le point de supprimer le profil ?": "Vous êtes sur le point de supprimer le profil ?"
	});

}]);