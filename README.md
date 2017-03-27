Sprint 1 : 
Nous avons essayé de mettre en place l'environnement mais nous avons eu des soucis d'installation pour mongo et node à cause du quota donc nous essayons d'utiliser docker. Nous avons fait activer le son par les admins pour pouvoir tester plus tard la synthèse vocale. 

Sprint 2 :
Nous nous sommes réparti les taches durant ce sprint, pour l'instant, le projet ne peut pas se lancer en local, ce qui nous empéchent de travailler sur le JavaScript. Nous nous sommes renseigné sur les API nécessaires et commencé à travailler sur la synthése vocale. Nous avons aussi commencé à travailler sur le serveur REST et sur l'appli mobile.

Sprint 3 :
Durant ce sprint nous avons fait l'application android permettant à l'administrateur d'avoir une vue des différents compte utilisateurs. Nous avons continué à travailler sur le serveur REST et à comprendre plus en profondeur le fonctionnement de l'application.

Sprint 4: 
L'installaton en offline du git est ok ! On peut enfin commencer à modifier le JS. L'application mobile affichant les utilisateurs est ok , avec une nouvelle fonctionnalité de redirection vers une boite mail ! 
Pour le serveur, nous avons mis en place le squelette REST et commencé à travailler dessus mais nous avons beaucoup de problémes liés à l'environnement.
Pour le javascript, nous nous sommes rendus compte que les navigateurs trop anciens ne fonctionnent pas avec la synthese vocale mais la plupart des navigateurs récents fonctionnent (tests effectués sur Safari, Google Chroome, Firefox, Internet Explorer, Chromium) et pas que Google Chrome. En revanche, aucun navigateurs sur les PC Linux de l'IUT ne fontionnent.

Sprint 5:
Nous avons regardé comment faire pour récupérer des informations du serveur REST depuis l'application android


Sprint 6: Pour ce qui est de l'avancement des voix on a réussi à la changé en fonction de la langue du navigateur.
Avancement sur la compréhension du fonctionnement de REST en android.

Sprint 7: L'application Android arrive à récupérer le JSON du serveur REST. Nous avons testé Accessidys pour voir comment le site fonctionne et essayé de comprendre le code.

Sprint 8 : Il est difficile de comprendre le code et nous avons préféré nous concentrer sur le serveur que la colloration des des mots par syllabes. Nous avons réussi à créer des profils sur le serveur et ne pas autoriser la création d'utilisateur avec une adresse email déjà présente dans la base de données. L'application Android a adapté l'affichage pour la récupération des données du serveur. La langue de la synthèse vocale s'adapte maintenant à la langue du navigateur.

Sprint 9 : Le serveur n'autorise pas la création d'un utilisateur ayant rentré une adresse email invalide. 
La synthese vocale fonctionne désormais pour toutes les langues possibles pour le navigateur. Elle est pour l'instant paramétrée selon la langue du navigateur.
L'application android utilise maintenant la librairie volley pour faire les requetes au serveur REST

Sprint 10 : Compréhension des requetes delete avec volley.

Sprint 11 : L'application android arrive à supprimer des utilisateurs et l'affichage prend en compte le cas du serveur sans utilisateur.
