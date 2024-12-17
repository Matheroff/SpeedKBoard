import { useEffect } from 'react';
import './App.css';

function App() {

        const wordsList = ["mécréant", "bouchon", "serviette", "habile", "tonnerre", "radiateur", "chaton", "couteau", "lanterne", "bécasse", "toupie", "chenille", "cabane", "bambin", "plante", "verre", "cependant", "bière", "casquette", "bougie"];
        const stringList = ["Comment est votre blanquette", 
        "Les framboises sont perchées sur le tabouret de mon grand-père", 
        "Elle est où la poulette", 
        "Il faut mettre du beurre au fond du plat pour pas que le gratin colle",
        "Le caca des canards, c'est caca",
        "Je suis ton père",
        "Que je trépasse si je faiblis",
        "Vous ne passerez pas",
        "Vous êtes bien grossière pour une femme dont le tonton est pharaon",
        "Cela ne se peut"];

        useEffect(() => {
          // Contenu des fonctions ici
          function showPopup() {
              let popupBackground = document.querySelector(".popupBackground");
              popupBackground.classList.add("active");
          }
          function hidePopup() {
              let popupBackground = document.querySelector(".popupBackground");
              popupBackground.classList.remove("active");
          }
          function initAddEventListenerPopup() {
              let btnPartage = document.querySelector(".zonePartage button");
              let popupBackground = document.querySelector(".popupBackground");
              if (btnPartage) {
                  btnPartage.addEventListener("click", showPopup);
              }
              if (popupBackground) {
                  popupBackground.addEventListener("click", (event) => {
                      if (event.target === popupBackground) hidePopup();
                  });
              }
          }
  
          function showResult(score, nbMotsProposes) {
              let spanScore = document.querySelector(".zoneScore span");
              if (spanScore) spanScore.innerText = `${score} / ${nbMotsProposes}`;
          }
          function showProposition(proposition) {
              let zoneProposition = document.querySelector(".zoneProposition");
              if (zoneProposition) zoneProposition.innerText = proposition;
          }
          function startGame() {
              initAddEventListenerPopup();
  
              let score = 0,
                  i = 0;
              let propositionList = wordsList;
              let validateWordButton = document.getElementById("validateWordButton");
              let restartButton = document.getElementById("restartButton");
              let inputEcriture = document.getElementById("inputEcriture");
  
              if (!validateWordButton || !restartButton || !inputEcriture) return;
  
              let gameEnded = false; // Variable pour suivre l'état de la partie

              function startNewGame() {
                  score = 0;
                  i = 0;
                  gameEnded = false; // Réinitialise l'état du jeu
                  propositionList =
                      document.querySelector("input[name='optionSource']:checked").value === "1"
                          ? wordsList
                          : stringList;
                  validateWordButton.textContent = "Valider";
                  validateWordButton.disabled = false;
                  showProposition(propositionList[i]);
                  showResult(score, i);
                  inputEcriture.value = "";
              }
      
              function validerInput() {
                  if (gameEnded) return; // Si la partie est terminée, ne rien faire
      
                  if (inputEcriture.value === propositionList[i]) score++;
                  i++;
                  showResult(score, i);
                  inputEcriture.value = '';
                  if (!propositionList[i]) {
                      showProposition("Partie terminée :)");
                      validateWordButton.textContent = "Nouvelle partie";
                      validateWordButton.disabled = false;
                      gameEnded = true; // Marquer la partie comme terminée
                      validateWordButton.addEventListener("click", startNewGame, { once: true });
                  } else {
                      showProposition(propositionList[i]);
                  }
              }
  
              validateWordButton.addEventListener("click", validerInput);
              inputEcriture.addEventListener("keydown", (event) => {
                  if (event.key === "Enter") {
                      event.preventDefault();
                      validerInput();
                  }
              });
              restartButton.addEventListener("click", startNewGame);
              document.querySelectorAll(".optionSource input").forEach((radio) =>
                  radio.addEventListener("change", (event) => {
                      propositionList = event.target.value === "1" ? wordsList : stringList;
                      showProposition(propositionList[i]);
                  })
              );
              showResult(score, i);
          }
  
          startGame();
      }, []);
  
      return (
          <>
            <div className='center-elements'>
              <header>
                  <h1>SpeedKBoard</h1>
                  <h2>L'application pour écrire plus vite !</h2>
                  <h3>SpeedKBoard est une application pour apprendre à taper plus vite au clavier :)</h3>
              </header>
              <main>
                  <div className="selectGame">
                      <p>Choisissez votre option et tapez la proposition qui s'affiche dans le champ en-dessous.</p>
                      <div className="optionSource">
                          <input type="radio" name="optionSource" id="mots" value="1" defaultChecked />
                          <label htmlFor="mots">Mots</label>
                          <input type="radio" name="optionSource" id="phrases" value="2" />
                          <label htmlFor="phrases">Phrases</label>
                      </div>
                  </div>
  
                  <div className="zoneProposition">Azerty</div>
  
                  <div className="zoneSaisie">
                      <input type="text" id="inputEcriture" name="inputEcriture" />
                      <button id="validateWordButton">Valider</button>
                  </div>
  
                  <div className="zoneRecommencer">
                      <button id="restartButton">Recommencer</button>
                  </div>
                  <br />
  
                  <div className="zoneScore">
                      Votre score : <span>0</span>
                  </div>
  
                  <div className="zonePartage">
                      <button>Partager</button>
                  </div>
              </main>
  
              <div className="popupBackground">
                  <div className="popup">
                      <div>Partagez votre score</div>
                      <form>
                          <label htmlFor="nom">Votre nom</label>
                          <input type="text" id="nom" name="nom" placeholder="Votre nom" />
                          <label htmlFor="email">Avec qui voulez-vous partager votre score ?</label>
                          <input type="email" id="email" name="email" placeholder="nom@domaine.com" />
                          <button id="btnEnvoyerMail">Envoyer</button>
                      </form>
                  </div>
              </div>
            </div>  
          </>
      );
  }
  
  export default App;