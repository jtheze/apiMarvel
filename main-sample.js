// Remplacer les valeurs de publickey et privatekey par vos clés Marvel !

$(document).ready(function(){
  $('.collapsible').collapsible();
  //On instancie les paramètres de l'URL
  var date = new Date();
  var ts = date.getTime().toString();
  var publickey = "mypublickey";
  var privatekey = "myprivatekey";
  // On génère la clé demandée par l'API marvel grâce à la librairie hmac-md5.js
  var hash = CryptoJS.MD5(ts+privatekey+publickey);

  // On construit l'URL pour récupérer la liste des comics
  var url = "https://gateway.marvel.com:443/v1/public/comics?ts="+ts+"&apikey="+publickey+"&hash="+hash;

  // On récupère la liste des comics en JSON
  $.getJSON(url, function(data){
    var liste = data.data.results;
    // On boucle sur les éléments du JSON
    for(var i in liste){
      var comic = liste[i];
      // On génère la liste des comics
      var newLine = $('<li id='+comic.id+' class="comic"><div class="collapsible-header"><i class="large material-icons">code</i><i>'+comic.title+'</i></div></li>');

      $(newLine).one('click', function(){
        // On récupère l'ID d'un comic
        var id = $(this).attr('id');
        // On construit l'URL pour récupérer les infos d'un comic
        var url = "https://gateway.marvel.com:443/v1/public/comics/"+id+"?ts="+ts+"&apikey="+publickey+"&hash="+hash;
        $.getJSON(url, function(data){
          var results = data.data.results;
          var content = results[0].description;
          // On remplace null par "No description !"
          if(content === null){
            content = "No description !";
          }
          // On génère la description d'un comic
          var newContent = $('<div class="collapsible-body"><span>'+content+'</span></div>');
          // On l'ajoute à la ligne
          $("#"+id).append(newContent);

        });
      });
      $(newLine).appendTo('.collapsible');
    }
  });
});
