// Données de l'enquête. Validées par tools/validate_case.py (cohérence et solvabilité).
window.CASE = {
  "id": "helios",
  "title": "Affaire n°0 — Le prototype Helios",
  "intro": "Lundi 8 h 02. La puce prototype « Helios » de la start-up NovaTek a disparu du coffre du laboratoire pendant le week-end. Sans elle, la levée de fonds de jeudi tombe à l'eau. La direction refuse d'appeler la police avant d'être sûre. Vous avez accès aux documents internes, aux messageries et aux photos. Trouvez qui, comment, et prouvez-le.",
  "suspects": [
    { "id": "marc", "name": "Marc Delorme", "role": "Directeur technique (CTO)", "color": "#5aa9ff", "bio": "Co-fondateur. Seul, avec la PDG, à avoir le code du coffre. Son badge a été utilisé vendredi soir." },
    { "id": "sofia", "name": "Sofia Ramdani", "role": "Stagiaire R&D", "color": "#c084fc", "bio": "Brillante, en fin de stage. Dernière à avoir quitté le labo vendredi." },
    { "id": "hugo", "name": "Hugo Ferrand", "role": "Ex-associé, fondateur de Kairos Chips", "color": "#f5a524", "bio": "A quitté NovaTek il y a un an en mauvais termes. Était dans les locaux vendredi après-midi pour « récupérer des affaires »." },
    { "id": "yannick", "name": "Yannick Morel", "role": "Agent de sécurité de nuit", "color": "#2ecc71", "bio": "En poste de 20 h à 6 h. Trois avertissements pour absences pendant ses rondes." }
  ],
  "documents": [
    { "id": "d_badges", "title": "Journal des badges — vendredi", "icon": "🗂", "body": "EXTRAIT DU SYSTÈME D'ACCÈS — Vendredi 14\n\n16:02  Accueil        VISITEUR-07 (H. Ferrand)    ENTRÉE\n16:05  Salle Orion    VISITEUR-07                 ENTRÉE\n16:51  Accueil        VISITEUR-07                 SORTIE\n18:30  Labo           S. RAMDANI                  ENTRÉE\n21:12  Labo           S. RAMDANI                  SORTIE\n21:14  Accueil        S. RAMDANI                  SORTIE\n22:14  Labo           M. DELORME                  ENTRÉE\n22:31  Labo           M. DELORME                  SORTIE\n22:33  Parking        M. DELORME                  SORTIE",
      "clues": [{ "id": "c_badge_marc", "text": "Le badge de Marc ouvre le labo à 22 h 14 et ressort à 22 h 31.", "time": "22:14", "spot": "22:14  Labo" },
                { "id": "c_hugo_orion", "text": "Hugo était seul en salle Orion de 16 h 05 à 16 h 51.", "time": "16:05", "spot": "Salle Orion" }] },
    { "id": "d_visio", "title": "Relevé de visioconférence — M. Delorme", "icon": "📹", "body": "PLATEFORME MEETLINK — Historique du compte m.delorme@novatek.io\n\nVendredi 14\n21:58 → 23:12   « Pitch investisseurs — Singapour »   Caméra : ACTIVÉE   Adresse IP : 86.214.xx.xx (Box domicile, Lyon 3e)\nParticipants : M. Delorme, K. Tan (Lion Ventures), A. Wong (Lion Ventures)\nEnregistrement disponible : oui (1 h 14 min)",
      "clues": [{ "id": "c_marc_alibi", "text": "Marc était en visio, caméra allumée, depuis son domicile de 21 h 58 à 23 h 12.", "time": "21:58", "spot": "Caméra : ACTIVÉE" }] },
    { "id": "d_presse", "title": "Article — TechHebdo", "icon": "📰", "body": "KAIROS CHIPS PROMET UNE RÉVOLUTION « DANS LES SEMAINES QUI VIENNENT »\n\nLa jeune pousse fondée par Hugo Ferrand annonce une puce basse consommation « au moins aussi performante que ce que prépare la concurrence lyonnaise ». Une démonstration est prévue lundi prochain devant des investisseurs. Interrogé sur l'avancement réel de ses travaux, M. Ferrand a refusé de répondre.\n\nSelon nos informations, Kairos Chips aurait un besoin urgent de financement : ses fonds seraient épuisés d'ici la fin du mois.",
      "clues": [{ "id": "c_hugo_motive", "text": "Kairos Chips (Hugo) a besoin d'argent et promet une démo de puce lundi prochain.", "spot": "Une démonstration est prévue lundi" }] },
    { "id": "d_rapport", "title": "Rapport de ronde — Y. Morel", "icon": "📋", "body": "RONDE DE NUIT — Vendredi 14 / Samedi 15\n\n20:00  Prise de poste. RAS.\n21:00  Ronde étage 1 et 2. RAS.\n22:00  Ronde parking. RAS.\n23:00  Ronde complète. RAS.\n\nSignature : Y. Morel",
      "clues": [{ "id": "c_ronde", "text": "Yannick affirme avoir fait sa ronde du parking à 22 h, sans rien remarquer.", "time": "22:00", "spot": "22:00  Ronde parking" }] },
    { "id": "d_location", "title": "Contrat de location de véhicule", "icon": "🚗", "body": "LOCAUTO — CONTRAT N° 55-1187\n\nLocataire : Kairos Chips SAS, représentée par M. Hugo Ferrand\nVéhicule : Peugeot 308 grise\nImmatriculation : GK-347-HF\nPériode : du vendredi 14 (09:00) au lundi 17 (09:00)",
      "clues": [{ "id": "c_plaque_hugo", "text": "Hugo loue une Peugeot 308 grise immatriculée GK-347-HF tout le week-end.", "spot": "GK-347-HF" }] }
  ],
  "chats": [
    { "id": "ch_marc_sofia", "title": "Marc ↔ Sofia", "with": ["marc", "sofia"], "messages": [
      ["marc", "17:20", "Sofia, tu as vu mon badge ? Impossible de remettre la main dessus."],
      ["sofia", "17:22", "Non… tu l'avais pendant la réunion avec Hugo ?"],
      ["marc", "17:24", "Oui, je l'ai posé sur la table de la salle Orion. Je suis parti au téléphone et Hugo y est resté seul un moment. Je le cherche lundi, là je file à la maison préparer le pitch."],
      ["sofia", "17:25", "Ok ! Bon courage pour Singapour 🤞"]
    ], "clues": [{ "id": "c_badge_oublie", "text": "Marc a oublié son badge en salle Orion vendredi, où Hugo est resté seul.", "msg": 2 }] },
    { "id": "ch_sofia_lea", "title": "Sofia ↔ Léa", "with": ["sofia"], "messages": [
      ["sofia", "20:41", "Il faut absolument que ça disparaisse avant lundi 😩"],
      ["sofia", "20:41", "Le rapport de tests de la puce, j'ai fait une erreur dans les mesures. Si Marc le voit je suis grillée pour l'embauche."],
      ["sofia", "21:13", "Corrigé et remplacé ! Je file au concert, on se rejoint là-bas ?"],
      ["sofia", "21:58", "Je suis devant la scène, 2e rang 🎸"]
    ], "clues": [{ "id": "c_sofia_rapport", "text": "Le message suspect de Sofia concernait un rapport de tests erroné, pas la puce.", "msg": 1 },
                 { "id": "c_sofia_concert", "text": "Sofia est au concert à 21 h 58.", "time": "21:58", "msg": 3 }] },
    { "id": "ch_yannick", "title": "Yannick ↔ Kevin", "with": ["yannick"], "messages": [
      ["yannick", "21:55", "Je descends au tabac en face, je reviens dans 30 min max"],
      ["yannick", "22:27", "C'est bon je suis remonté. Personne n'a rien vu 😎"],
      ["yannick", "22:28", "Par contre y'avait une voiture grise garée devant l'entrée du labo, moteur allumé, bizarre"]
    ], "clues": [{ "id": "c_yannick_absent", "text": "Yannick n'était pas à son poste entre 21 h 55 et 22 h 27 : son rapport de ronde est faux.", "time": "21:55", "msg": 0 },
                 { "id": "c_voiture_grise", "text": "Une voiture grise était garée devant le labo, moteur allumé, vers 22 h 27.", "time": "22:27", "msg": 2 }] }
  ],
  "photos": [
    { "id": "p_parking", "title": "Caméra parking — 22:16:43", "scene": "parking", "time": "22:16",
      "hotspots": [{ "x": 0.555, "y": 0.73, "r": 0.05, "clue": { "id": "c_plaque_photo", "text": "Caméra parking 22 h 16 : Peugeot grise, plaque partielle « …-347-HF ».", "time": "22:16" } },
                   { "x": 0.17, "y": 0.55, "r": 0.06, "clue": { "id": "c_guerite_vide", "text": "La guérite du gardien est vide à 22 h 16.", "time": "22:16" } }] },
    { "id": "p_orion", "title": "Salle Orion — photo de la réunion (vendredi 16 h 20)", "scene": "orion",
      "hotspots": [{ "x": 0.62, "y": 0.62, "r": 0.05, "clue": { "id": "c_badge_table", "text": "Le badge de Marc est sur la table de la salle Orion pendant la réunion.", "time": "16:20" } }] },
    { "id": "p_concert", "title": "Story Instagram de Sofia — 21:57", "scene": "concert", "time": "21:57",
      "hotspots": [{ "x": 0.82, "y": 0.12, "r": 0.06, "clue": { "id": "c_sofia_story", "text": "Story de Sofia publiée à 21 h 57, au concert, géolocalisée à 12 km du labo.", "time": "21:57" } }] }
  ],
  "solution": {
    "culprit": "hugo",
    "method": "badge",
    "proof": ["c_plaque_photo", "c_plaque_hugo"],
    "methods": [
      { "id": "badge", "text": "Il a utilisé le badge de Marc, récupéré en salle Orion" },
      { "id": "code", "text": "Il connaissait le code du coffre" },
      { "id": "complice", "text": "Le gardien lui a ouvert la porte" },
      { "id": "nuit", "text": "Il s'est caché dans les locaux jusqu'à la nuit" }
    ],
    "explanation": "Vendredi à 16 h, Hugo Ferrand vient « récupérer des affaires ». En réunion en salle Orion, Marc pose son badge sur la table puis sort téléphoner : Hugo l'empoche. À 22 h 14, profitant de l'absence du gardien parti au tabac, il entre au labo avec le badge de Marc et ressort à 22 h 31 avec la puce Helios. La caméra du parking filme sa Peugeot 308 de location (GK-347-HF) à 22 h 16. Marc, lui, était en visio depuis chez lui, caméra allumée. Sofia était au concert. Le gardien est négligent et a falsifié son rapport, mais il n'est pas complice. Mobile : Kairos Chips est à court d'argent et doit présenter « sa » puce lundi."
  }
};
