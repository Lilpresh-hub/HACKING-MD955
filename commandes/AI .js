const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const axios = require('axios');





zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("oui je vous ecoute.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'fr' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Erreur lors de la traduction en français :', error);
      repondre('Erreur lors de la traduction en français');
    });
})
.catch(error => {
  console.error('Erreur lors de la requête à Thomas :', error);
  repondre('Erreur lors de la requête à BrainShop');
});

  }catch(e){ repondre("oupsaa une erreur : "+e)}
    
  
  });  
  


zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nécessaires pour générer l'image.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const image = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Propulsé par Hacking-MD*';
    
    if (data.status && data.owner && data.data) {
      // Utiliser les données retournées par le service
      const imageUrl = data.data;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
    } else {
      repondre("Erreur lors de la génération de l'image");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez poser une questions.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const question = arg.join(' ');
    const response = await axios.get(`https://ultimetron.guruapi.tech/gpt3?prompt=${question}`);
    
    const data = response.data;
    if (data) {
      repondre(data.data);
    } else {
      repondre("Erreur lors de la génération de la reponse");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "calcul", reaction: "👌", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { répondre, arg, ms } = commandeOptions;
  
  if (!arg || arg.length === 0) {
    return repondre(`Veuillez insérer des calculs mathématiques comme 100000-2024.\nUtilisez / pour la division et * pour la multiplication ou la lettre x.`);
  }
  
  // Regrouper les arguments en une seule chaîne séparée par "-"
  const pin = arg.join('-');
  const réponse = await fetch(`https://api.maher-zubair.tech/search/pinterest?q=${pin}`);
  const data = await réponse.json();
  
  await repondre(data.result);
  console.log(data.achèvement);
});

zokou({ nomCom: "thomas", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`Veuillez poser une question.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const question = arg.join(' ');
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${question}`);
  const data = await response.json();

  await repondre(data.result);
  console.log(data.completion);
});
