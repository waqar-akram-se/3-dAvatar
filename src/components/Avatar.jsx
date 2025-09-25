


// import { useState, useEffect, useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { Html } from '@react-three/drei';
// import * as THREE from 'three';

// // Enhanced phoneme-to-morph map with better mouth shapes
// const phonemeToMorphMap = {
//   // Vowels - more expressive mouth shapes
//   'AA': { targets: ['viseme_aa', 'jawOpen'], weights: [1.0, 0.3] },
//   'AE': { targets: ['viseme_aa', 'mouthOpen'], weights: [0.9, 0.2] },
//   'AH': { targets: ['viseme_aa', 'mouthWidth'], weights: [0.8, 0.1] },
//   'AO': { targets: ['viseme_O', 'jawOpen'], weights: [1.0, 0.4] },
//   'AW': { targets: ['viseme_O', 'viseme_U', 'mouthFunnel'], weights: [0.6, 0.3, 0.4] },
//   'AY': { targets: ['viseme_aa', 'viseme_I', 'mouthSmile'], weights: [0.5, 0.4, 0.2] },
//   'EH': { targets: ['viseme_E', 'mouthSmile'], weights: [1.0, 0.3] },
//   'ER': { targets: ['viseme_RR', 'mouthNarrow'], weights: [0.9, 0.3] },
//   'EY': { targets: ['viseme_E', 'mouthSmile'], weights: [0.9, 0.4] },
//   'IH': { targets: ['viseme_I', 'mouthSmile'], weights: [1.0, 0.2] },
//   'IY': { targets: ['viseme_I', 'mouthSmile'], weights: [1.0, 0.3] },
//   'OW': { targets: ['viseme_O', 'mouthFunnel'], weights: [1.0, 0.5] },
//   'OY': { targets: ['viseme_O', 'viseme_I', 'mouthFunnel'], weights: [0.6, 0.3, 0.3] },
//   'UH': { targets: ['viseme_U', 'mouthFunnel'], weights: [0.9, 0.4] },
//   'UW': { targets: ['viseme_U', 'mouthFunnel', 'mouthPucker'], weights: [1.0, 0.6, 0.3] },
  
//   // Consonants - more dynamic mouth movements
//   'B': { targets: ['viseme_PP', 'mouthClose'], weights: [1.0, 0.8] },
//   'CH': { targets: ['viseme_CH', 'mouthFunnel'], weights: [1.0, 0.4] },
//   'D': { targets: ['viseme_DD', 'tongueUp'], weights: [0.9, 0.3] },
//   'DH': { targets: ['viseme_TH', 'tongueOut'], weights: [0.8, 0.2] },
//   'F': { targets: ['viseme_FF', 'mouthNarrow'], weights: [1.0, 0.5] },
//   'G': { targets: ['viseme_kk', 'throatOpen'], weights: [0.8, 0.3] },
//   'HH': { targets: ['viseme_aa', 'mouthOpen', 'breathOut'], weights: [0.4, 0.3, 0.2] },
//   'JH': { targets: ['viseme_CH', 'mouthFunnel'], weights: [0.9, 0.3] },
//   'K': { targets: ['viseme_kk', 'throatOpen'], weights: [1.0, 0.4] },
//   'L': { targets: ['viseme_nn', 'tongueUp'], weights: [0.7, 0.5] },
//   'M': { targets: ['viseme_PP', 'mouthClose', 'mouthHum'], weights: [1.0, 0.9, 0.2] },
//   'N': { targets: ['viseme_nn', 'tongueUp'], weights: [1.0, 0.4] },
//   'NG': { targets: ['viseme_nn', 'throatOpen'], weights: [0.9, 0.3] },
//   'P': { targets: ['viseme_PP', 'mouthClose', 'mouthPop'], weights: [1.0, 0.9, 0.4] },
//   'R': { targets: ['viseme_RR', 'mouthNarrow', 'tongueCurl'], weights: [1.0, 0.4, 0.3] },
//   'S': { targets: ['viseme_SS', 'mouthNarrow', 'teethShow'], weights: [1.0, 0.6, 0.3] },
//   'SH': { targets: ['viseme_CH', 'mouthFunnel', 'shush'], weights: [1.0, 0.5, 0.4] },
//   'T': { targets: ['viseme_DD', 'tongueUp', 'mouthTap'], weights: [0.9, 0.4, 0.3] },
//   'TH': { targets: ['viseme_TH', 'tongueOut', 'teethBite'], weights: [1.0, 0.5, 0.2] },
//   'V': { targets: ['viseme_FF', 'mouthNarrow', 'vibrate'], weights: [0.9, 0.4, 0.2] },
//   'W': { targets: ['viseme_U', 'mouthPucker', 'mouthFunnel'], weights: [0.8, 0.6, 0.4] },
//   'Y': { targets: ['viseme_I', 'mouthSmile', 'tongueUp'], weights: [0.7, 0.3, 0.2] },
//   'Z': { targets: ['viseme_SS', 'mouthNarrow', 'vibrate'], weights: [0.9, 0.4, 0.2] },
//   'ZH': { targets: ['viseme_CH', 'mouthFunnel', 'vibrate'], weights: [0.9, 0.3, 0.2] },
  
//   // Silence and pauses
//   'SIL': { targets: ['viseme_sil', 'mouthRelax'], weights: [0.7, 0.3] },
//   'PAUSE': { targets: ['viseme_sil', 'mouthRelax', 'jawSlightlyOpen'], weights: [0.5, 0.4, 0.2] },
// };

// const ANIMATION_CONFIG = {
//   SMOOTHING: 0.2,
//   MAX_INFLUENCE: 1.0,
//   MIN_INFLUENCE: 0.1,
//   BLINK_RATE: 0.01,
//   EXPRESSION_VARIATION: 0.1,
// };

// // Demo texts with different contexts
// const DEMO_TEXTS = [
//   {
//     text: "Hello, how are you today?",
//     label: "👋 Greeting"
//   },
//   {
//     text: "Welcome to our virtual assistant system.",
//     label: "🤖 Introduction"
//   },
//   {
//     text: "The weather today is sunny and warm.",
//     label: "☀️ Weather"
//   },
//   {
//     text: "Thank you for using our service.",
//     label: "🙏 Thanks"
//   },
//   {
//     text: "Please wait while I process your request.",
//     label: "⏳ Processing"
//   },
//   {
//     text: "Yes, I can help you with that.",
//     label: "✅ Confirmation"
//   },
//   {
//     text: "Sorry, I didn't understand that.",
//     label: "❌ Apology"
//   },
//   {
//     text: "The quick brown fox jumps over the lazy dog.",
//     label: "🦊 Fun Sentence"
//   },
//   {
//     text: "Artificial intelligence is transforming our world.",
//     label: "🧠 Tech Fact"
//   },
//   {
//     text: "Goodbye, have a nice day!",
//     label: "👋 Farewell"
//   }
// ];

// // Global variables with better state management
// let lipSyncActive = false;
// let lipSyncAnimationId = null;
// let lipSyncStartTime = 0;
// let speechStartTime = 0;
// let currentPhonemeSequence = [];
// let speechExpectedDuration = 0;
// let speechEnded = false;

// // Function to get male voice
// function getMaleVoice() {
//   const synth = window.speechSynthesis;
//   const voices = synth.getVoices();
  
//   const maleVoiceKeywords = [
//     'google uk male', 'microsoft david', 'alex', 'daniel', 'thomas',
//     'male', 'man', 'deep', 'low', 'david', 'mark', 'paul'
//   ];
  
//   const maleVoice = voices.find(voice => {
//     const voiceName = voice.name.toLowerCase();
//     return maleVoiceKeywords.some(keyword => voiceName.includes(keyword));
//   });
  
//   if (!maleVoice) {
//     const deeperVoice = voices.find(voice => 
//       voice.name.toLowerCase().includes('deep') || 
//       voice.name.toLowerCase().includes('low')
//     );
//     return deeperVoice || voices[0];
//   }
  
//   return maleVoice;
// }

// // Simple text to phonemes conversion
// function textToPhonemes(text) {
//   const words = text.toUpperCase().split(/\s+/);
//   const phonemes = [];
  
//   words.forEach((word, wordIndex) => {
//     const cleanWord = word.replace(/[^A-Z]/g, '');
    
//     if (cleanWord.length > 0) {
//       // Convert each character to phoneme
//       const wordPhonemes = cleanWord.split('').map(char => charToPhoneme(char)).filter(p => p);
      
//       // Add word phonemes
//       phonemes.push(...wordPhonemes);
      
//       // Add pause between words (except after last word)
//       if (wordIndex < words.length - 1) {
//         phonemes.push('SIL');
//       }
//     }
//   });
  
//   return phonemes;
// }

// function charToPhoneme(char) {
//   const mapping = {
//     'A': 'AA', 'B': 'B', 'C': 'K', 'D': 'D', 'E': 'EH',
//     'F': 'F', 'G': 'G', 'H': 'HH', 'I': 'IH', 'J': 'JH',
//     'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'OW',
//     'P': 'P', 'Q': 'K', 'R': 'R', 'S': 'S', 'T': 'T',
//     'U': 'UH', 'V': 'V', 'W': 'W', 'X': 'K', 'Y': 'Y', 'Z': 'Z'
//   };
//   return mapping[char] || 'SIL';
// }

// function isVowel(phoneme) {
//   const vowels = ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW'];
//   return vowels.includes(phoneme);
// }

// // More accurate speech duration estimation
// function estimateSpeechDuration(text, rate = 0.9) {
//   // More precise estimation based on characters and words
//   const words = text.split(/\s+/).length;
//   const characters = text.length;
  
//   // Base estimation: average speaking speed is about 150 words per minute
//   const wordsPerSecond = 150 / 60; // 2.5 words per second
//   let estimatedDuration = words / wordsPerSecond;
  
//   // Adjust for speech rate
//   estimatedDuration *= (1 / rate);
  
//   // Add buffer for natural pauses
//   estimatedDuration += (words - 1) * 0.1;
  
//   return Math.max(estimatedDuration, 1.0); // Minimum 1 second
// }

// function updateEnhancedLipSync() {
//   if (!lipSyncActive || !currentPhonemeSequence || currentPhonemeSequence.length === 0 || !window.wolf3dHeadMesh) {
//     stopLipSync();
//     return;
//   }

//   const mesh = window.wolf3dHeadMesh;
//   const now = Date.now();
//   const elapsed = (now - lipSyncStartTime) / 1000;

//   // Stop immediately if speech has ended
//   if (speechEnded) {
//     stopLipSync();
//     return;
//   }

//   // Stop if we've exceeded the expected speech duration
//   if (elapsed >= speechExpectedDuration) {
//     stopLipSync();
//     return;
//   }

//   // Calculate current phoneme index based on elapsed time
//   const phonemeDuration = speechExpectedDuration / currentPhonemeSequence.length;
//   const currentPhonemeIndex = Math.min(
//     Math.floor(elapsed / phonemeDuration),
//     currentPhonemeSequence.length - 1
//   );

//   const nextPhonemeIndex = Math.min(currentPhonemeIndex + 1, currentPhonemeSequence.length - 1);
  
//   const currentPhoneme = currentPhonemeSequence[currentPhonemeIndex];
//   const nextPhoneme = currentPhonemeSequence[nextPhonemeIndex];
  
//   // Calculate blend factor between current and next phoneme
//   const currentPhonemeStart = currentPhonemeIndex * phonemeDuration;
//   const blendFactor = phonemeDuration > 0 ? (elapsed - currentPhonemeStart) / phonemeDuration : 0;
  
//   const phonemeIntensity = isVowel(currentPhoneme) ? 1.0 : 0.7;

//   // Apply morphing for the current phoneme
//   applyEnhancedMorphing(mesh, currentPhoneme, nextPhoneme, blendFactor, phonemeIntensity, elapsed);
  
//   // Continue animation only if still active and speech hasn't ended
//   if (lipSyncActive && !speechEnded) {
//     lipSyncAnimationId = requestAnimationFrame(updateEnhancedLipSync);
//   }
// }

// function applyEnhancedMorphing(mesh, currentPhoneme, nextPhoneme, blendFactor, intensity, time) {
//   if (!mesh.morphTargetInfluences) return;

//   const currentMorph = phonemeToMorphMap[currentPhoneme] || phonemeToMorphMap['SIL'];
//   const nextMorph = phonemeToMorphMap[nextPhoneme] || phonemeToMorphMap['SIL'];

//   // Smoothly reduce all influences
//   for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
//     mesh.morphTargetInfluences[i] *= (1 - ANIMATION_CONFIG.SMOOTHING);
//   }

//   const allTargets = new Set([...currentMorph.targets, ...nextMorph.targets]);
  
//   allTargets.forEach(targetName => {
//     const index = mesh.morphTargetDictionary[targetName];
//     if (index === undefined || index >= mesh.morphTargetInfluences.length) return;

//     const currentWeight = currentMorph.targets.includes(targetName) ? 
//       currentMorph.weights[currentMorph.targets.indexOf(targetName)] : 0;
    
//     const nextWeight = nextMorph.targets.includes(targetName) ? 
//       nextMorph.weights[nextMorph.targets.indexOf(targetName)] : 0;

//     const easeBlend = easeInOutCubic(blendFactor);
//     let blendedWeight = (1 - easeBlend) * currentWeight + easeBlend * nextWeight;
    
//     blendedWeight *= intensity;
    
//     blendedWeight = Math.max(ANIMATION_CONFIG.MIN_INFLUENCE, 
//                            Math.min(ANIMATION_CONFIG.MAX_INFLUENCE, blendedWeight));
    
//     mesh.morphTargetInfluences[index] = Math.max(
//       mesh.morphTargetInfluences[index],
//       blendedWeight
//     );
//   });

//   if (Math.random() < ANIMATION_CONFIG.BLINK_RATE) {
//     triggerBlink(mesh);
//   }
// }

// function easeInOutCubic(t) {
//   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// }

// function triggerBlink(mesh) {
//   const blinkIndex = mesh.morphTargetDictionary['blink'];
//   if (blinkIndex !== undefined) {
//     mesh.morphTargetInfluences[blinkIndex] = 1.0;
//     setTimeout(() => {
//       if (mesh.morphTargetInfluences) {
//         mesh.morphTargetInfluences[blinkIndex] = 0;
//       }
//     }, 100);
//   }
// }

// function stopLipSync() {
//   lipSyncActive = false;
//   speechEnded = false;
//   currentPhonemeSequence = [];
//   speechExpectedDuration = 0;
  
//   if (lipSyncAnimationId) {
//     cancelAnimationFrame(lipSyncAnimationId);
//     lipSyncAnimationId = null;
//   }

//   // Reset morph targets immediately
//   if (window.wolf3dHeadMesh && window.wolf3dHeadMesh.morphTargetInfluences) {
//     const mesh = window.wolf3dHeadMesh;
    
//     // Immediate reset instead of smooth reset
//     for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
//       mesh.morphTargetInfluences[i] = 0;
//     }
//   }
// }

// // React Component
// export function Avatar(props) {
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [currentText, setCurrentText] = useState("");
//   const [availableVoices, setAvailableVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const { nodes, materials } = useGLTF('/models/model.glb');
//   const group = useRef();
//   const synth = window.speechSynthesis;

//   useEffect(() => {
//     // Load voices
//     const loadVoices = () => {
//       const voices = synth.getVoices();
//       setAvailableVoices(voices);
//       const maleVoice = getMaleVoice();
//       setSelectedVoice(maleVoice);
//     };

//     loadVoices();
    
//     // Some browsers load voices asynchronously
//     synth.onvoiceschanged = loadVoices;

//     if (nodes && nodes.Wolf3D_Head) {
//       window.wolf3dHeadMesh = nodes.Wolf3D_Head;
//       if (window.wolf3dHeadMesh.morphTargetInfluences) {
//         for (let i = 0; i < window.wolf3dHeadMesh.morphTargetInfluences.length; i++) {
//           window.wolf3dHeadMesh.morphTargetInfluences[i] = 0;
//         }
//       }
//     }

//     return () => {
//       if (synth) synth.cancel();
//       stopLipSync();
//     };
//   }, [nodes, synth]);

//   const speakText = (text) => {
//     if (!synth || !text.trim()) return;

//     // Cancel any ongoing speech and lip sync
//     synth.cancel();
//     stopLipSync();

//     const utterance = new SpeechSynthesisUtterance(text);
    
//     // Set male voice
//     if (selectedVoice) {
//       utterance.voice = selectedVoice;
//     }
    
//     // Configure for male-like speech
//     utterance.rate = 0.9;
//     utterance.pitch = 0.8;
//     utterance.volume = 1.0;

//     setCurrentText(text);
//     speechEnded = false;

//     utterance.onstart = () => {
//       setIsSpeaking(true);
//       speechStartTime = Date.now();
      
//       // Convert text to phonemes
//       currentPhonemeSequence = textToPhonemes(text);
      
//       // Estimate speech duration based on text length and rate
//       speechExpectedDuration = estimateSpeechDuration(text, utterance.rate);
      
//       lipSyncStartTime = Date.now();
//       lipSyncActive = true;

//       console.log(`Starting speech: ${text}`);
//       console.log(`Estimated duration: ${speechExpectedDuration.toFixed(2)}s`);
//       console.log(`Phonemes: ${currentPhonemeSequence.length}`);

//       // Start lip sync animation
//       lipSyncAnimationId = requestAnimationFrame(updateEnhancedLipSync);
//     };

//     utterance.onend = () => {
//       console.log('Speech ended');
//       speechEnded = true;
//       setIsSpeaking(false);
//       setCurrentText("");
//       // Stop lip sync immediately when speech ends
//       stopLipSync();
//     };

//     utterance.onerror = (event) => {
//       console.error('Speech synthesis error:', event);
//       speechEnded = true;
//       setIsSpeaking(false);
//       setCurrentText("");
//       stopLipSync();
//     };

//     // Use boundary events for better synchronization if available
//     utterance.onboundary = (event) => {
//       // This can help with more precise timing if needed
//       console.log('Speech boundary:', event);
//     };

//     synth.speak(utterance);
//   };

//   const handleSpeak = () => {
//     const text = prompt("Enter text to speak:", "Hello, how are you today?");
//     if (text) speakText(text);
//   };

//   const handleDemoSpeak = (demoText) => {
//     speakText(demoText);
//   };

//   const handleVoiceChange = (voiceName) => {
//     const voice = availableVoices.find(v => v.name === voiceName);
//     if (voice) {
//       setSelectedVoice(voice);
//     }
//   };

//   const handleStopSpeaking = () => {
//     synth.cancel();
//     stopLipSync();
//     setIsSpeaking(false);
//     setCurrentText("");
//   };

//   return (
//     <>
//       <Html center>
//         <div style={{
//           position: "absolute",
//           top: "20px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           zIndex: "2000",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           alignItems: "center",
//           maxWidth: "90vw"
//         }}>
//           {/* Voice Selection */}
//           <div style={{
//             padding: "10px",
//             backgroundColor: "rgba(0,0,0,0.8)",
//             borderRadius: "10px",
//             color: "white",
//             textAlign: "center"
//           }}>
//             <div style={{ fontSize: "12px", marginBottom: "5px" }}>🎙️ Voice: {selectedVoice?.name || 'Default'}</div>
//             <select 
//               onChange={(e) => handleVoiceChange(e.target.value)}
//               style={{
//                 padding: "5px",
//                 fontSize: "12px",
//                 borderRadius: "5px",
//                 border: "none",
//                 backgroundColor: "#333",
//                 color: "white"
//               }}
//             >
//               {availableVoices.map(voice => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Main Speak Button */}
//           <button
//             style={{
//               padding: "12px 24px",
//               backgroundColor: isSpeaking ? "#ff9800" : "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "25px",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//               minWidth: "200px"
//             }}
//             onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
//           >
//             {isSpeaking ? "⏹️ Stop Speaking" : "🎤 Speak Text"}
//           </button>
          
//           {/* Current Speech Display */}
//           {isSpeaking && (
//             <div style={{
//               padding: "15px",
//               backgroundColor: "rgba(0,0,0,0.9)",
//               color: "white",
//               borderRadius: "10px",
//               textAlign: "center",
//               fontSize: "14px",
//               maxWidth: "300px",
//               border: "2px solid #4CAF50"
//             }}>
//               <div style={{fontSize: "12px", color: "#4CAF50", marginBottom: "5px"}}>🗣️ SPEAKING</div>
//               "{currentText}"
//             </div>
//           )}

//           {/* Demo Buttons Grid */}
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: "8px",
//             maxWidth: "400px",
//             marginTop: "10px"
//           }}>
//             {DEMO_TEXTS.map((demo, index) => (
//               <button
//                 key={index}
//                 style={{
//                   padding: "8px 12px",
//                   backgroundColor: "#2196F3",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "20px",
//                   cursor: "pointer",
//                   fontSize: "11px",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   maxWidth: "180px"
//                 }}
//                 onClick={() => handleDemoSpeak(demo.text)}
//                 title={demo.text}
//                 disabled={isSpeaking}
//               >
//                 {demo.label}
//               </button>
//             ))}
//           </div>

//           {/* Quick Action Buttons */}
//           <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#FF5722",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("Stop! Wait a moment.")}
//               disabled={isSpeaking}
//             >
//               ⚠️ Stop
//             </button>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#9C27B0",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("Yes, that's correct!")}
//               disabled={isSpeaking}
//             >
//               👍 Yes
//             </button>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#607D8B",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("No, that's not right.")}
//               disabled={isSpeaking}
//             >
//               👎 No
//             </button>
//           </div>
//         </div>
//       </Html>

//       <group {...props} dispose={null} ref={group}>
//         <primitive object={nodes.Hips} />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Body.geometry}
//           material={materials.Wolf3D_Body}
//           skeleton={nodes.Wolf3D_Body.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
//           material={materials.Wolf3D_Outfit_Bottom}
//           skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
//           material={materials.Wolf3D_Outfit_Footwear}
//           skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Top.geometry}
//           material={materials.Wolf3D_Outfit_Top}
//           skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Hair.geometry}
//           material={materials.Wolf3D_Hair}
//           skeleton={nodes.Wolf3D_Hair.skeleton}
//         />
//         <skinnedMesh
//           name="EyeLeft"
//           geometry={nodes.EyeLeft.geometry}
//           material={materials.Wolf3D_Eye}
//           skeleton={nodes.EyeLeft.skeleton}
//           morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
//           morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="EyeRight"
//           geometry={nodes.EyeRight.geometry}
//           material={materials.Wolf3D_Eye}
//           skeleton={nodes.EyeRight.skeleton}
//           morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
//           morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Glasses"
//           geometry={nodes.Wolf3D_Glasses.geometry}
//           material={materials.Wolf3D_Glasses}
//           skeleton={nodes.Wolf3D_Glasses.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Glasses.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Glasses.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Head"
//           geometry={nodes.Wolf3D_Head.geometry}
//           material={materials.Wolf3D_Skin}
//           skeleton={nodes.Wolf3D_Head.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Teeth"
//           geometry={nodes.Wolf3D_Teeth.geometry}
//           material={materials.Wolf3D_Teeth}
//           skeleton={nodes.Wolf3D_Teeth.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
//         />
//       </group>
//     </>
//   );
// }

// useGLTF.preload('/models/model.glb');

// import { useState, useEffect, useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { Html } from '@react-three/drei';
// import * as THREE from 'three';

// // Comprehensive phoneme-to-morph map
// const phonemeToMorphMap = {
//   // Vowels
//   'AA': { targets: ['viseme_aa'], weights: [1.0] },
//   'AE': { targets: ['viseme_aa'], weights: [0.8] },
//   'AH': { targets: ['viseme_aa'], weights: [0.7] },
//   'AO': { targets: ['viseme_O'], weights: [0.9] },
//   'AW': { targets: ['viseme_O', 'viseme_U'], weights: [0.7, 0.3] },
//   'AY': { targets: ['viseme_aa', 'viseme_I'], weights: [0.6, 0.4] },
//   'EH': { targets: ['viseme_E'], weights: [1.0] },
//   'ER': { targets: ['viseme_RR'], weights: [0.8] },
//   'EY': { targets: ['viseme_E'], weights: [0.9] },
//   'IH': { targets: ['viseme_I'], weights: [1.0] },
//   'IY': { targets: ['viseme_I'], weights: [1.0] },
//   'OW': { targets: ['viseme_O'], weights: [1.0] },
//   'OY': { targets: ['viseme_O', 'viseme_I'], weights: [0.7, 0.3] },
//   'UH': { targets: ['viseme_U'], weights: [0.8] },
//   'UW': { targets: ['viseme_U'], weights: [1.0] },
  
//   // Consonants
//   'B': { targets: ['viseme_PP'], weights: [1.0] },
//   'CH': { targets: ['viseme_CH'], weights: [1.0] },
//   'D': { targets: ['viseme_DD'], weights: [1.0] },
//   'DH': { targets: ['viseme_TH'], weights: [0.8] },
//   'F': { targets: ['viseme_FF'], weights: [1.0] },
//   'G': { targets: ['viseme_kk'], weights: [0.8] },
//   'HH': { targets: ['viseme_aa'], weights: [0.5] },
//   'JH': { targets: ['viseme_CH'], weights: [0.9] },
//   'K': { targets: ['viseme_kk'], weights: [1.0] },
//   'L': { targets: ['viseme_nn'], weights: [0.7] },
//   'M': { targets: ['viseme_PP'], weights: [1.0] },
//   'N': { targets: ['viseme_nn'], weights: [1.0] },
//   'NG': { targets: ['viseme_nn'], weights: [0.9] },
//   'P': { targets: ['viseme_PP'], weights: [1.0] },
//   'R': { targets: ['viseme_RR'], weights: [1.0] },
//   'S': { targets: ['viseme_SS'], weights: [1.0] },
//   'SH': { targets: ['viseme_CH'], weights: [1.0] },
//   'T': { targets: ['viseme_DD'], weights: [0.9] },
//   'TH': { targets: ['viseme_TH'], weights: [1.0] },
//   'V': { targets: ['viseme_FF'], weights: [0.9] },
//   'W': { targets: ['viseme_U'], weights: [0.7] },
//   'Y': { targets: ['viseme_I'], weights: [0.7] },
//   'Z': { targets: ['viseme_SS'], weights: [0.9] },
//   'ZH': { targets: ['viseme_CH'], weights: [0.9] },
  
//   // Silence and pauses
//   'SIL': { targets: ['viseme_sil'], weights: [1.0] },
//   'PAUSE': { targets: ['viseme_sil'], weights: [0.5] },
// };

// // Default fallback for unknown phonemes
// const defaultMorph = { targets: ['viseme_sil'], weights: [1.0] };

// let lipSyncActive = false;
// let lipSyncAnimationId = null;
// let lipSyncStartTime = 0;
// let characterTimestamps = [];

// // English pronunciation dictionary (simplified CMU-like)
// const pronunciationDictionary = {
//   // Common words
//   'HELLO': ['HH', 'EH', 'L', 'OW'],
//   'GOOD': ['G', 'UH', 'D'],
//   'MORNING': ['M', 'AO', 'R', 'N', 'IH', 'NG'],
//   'HOW': ['HH', 'AW'],
//   'ARE': ['AA', 'R'],
//   'YOU': ['Y', 'UW'],
//   'TODAY': ['T', 'UH', 'D', 'EY'],
//   'WHAT': ['W', 'AH', 'T'],
//   'WHERE': ['W', 'EH', 'R'],
//   'WHEN': ['W', 'EH', 'N'],
//   'WHY': ['W', 'AY'],
//   'WHO': ['HH', 'UW'],
//   'WHICH': ['W', 'IH', 'CH'],
//   'THIS': ['DH', 'IH', 'S'],
//   'THAT': ['DH', 'AE', 'T'],
//   'THESE': ['DH', 'IY', 'Z'],
//   'THOSE': ['DH', 'OW', 'Z'],
//   'THE': ['DH', 'AH'],
//   'A': ['AH'],
//   'AN': ['AE', 'N'],
//   'AND': ['AE', 'N', 'D'],
//   'BUT': ['B', 'AH', 'T'],
//   'OR': ['AO', 'R'],
//   'FOR': ['F', 'AO', 'R'],
//   'WITH': ['W', 'IH', 'DH'],
//   'ABOUT': ['AH', 'B', 'AW', 'T'],
//   'AFTER': ['AE', 'F', 'T', 'ER'],
//   'BEFORE': ['B', 'IH', 'F', 'AO', 'R'],
//   'BETWEEN': ['B', 'IH', 'T', 'W', 'IY', 'N'],
//   'INTO': ['IH', 'N', 'T', 'UW'],
//   'THROUGH': ['TH', 'R', 'UW'],
//   'UNDER': ['AH', 'N', 'D', 'ER'],
//   'OVER': ['OW', 'V', 'ER'],
//   'AGAIN': ['AH', 'G', 'EH', 'N'],
//   'AGAINST': ['AH', 'G', 'EH', 'N', 'S', 'T'],
//   'ALONG': ['AH', 'L', 'AO', 'NG'],
//   'AMONG': ['AH', 'M', 'AH', 'NG'],
//   'AROUND': ['AH', 'R', 'AW', 'N', 'D'],
//   'BECAUSE': ['B', 'IH', 'K', 'AH', 'Z'],
//   'BECOME': ['B', 'IH', 'K', 'AH', 'M'],
//   'BEHIND': ['B', 'IH', 'HH', 'AY', 'N', 'D'],
//   'BELOW': ['B', 'IH', 'L', 'OW'],
//   'BENEATH': ['B', 'IH', 'N', 'IY', 'TH'],
//   'BESIDE': ['B', 'IH', 'S', 'AY', 'D'],
//   'BEYOND': ['B', 'IH', 'Y', 'AO', 'N', 'D'],
//   'DURING': ['D', 'UH', 'R', 'IH', 'NG'],
//   'EXCEPT': ['IH', 'K', 'S', 'EH', 'P', 'T'],
//   'INSIDE': ['IH', 'N', 'S', 'AY', 'D'],
//   'OUTSIDE': ['AW', 'T', 'S', 'AY', 'D'],
//   'THROUGHOUT': ['TH', 'R', 'UW', 'AW', 'T'],
//   'TOWARD': ['T', 'UW', 'AO', 'R', 'D'],
//   'WITHIN': ['W', 'IH', 'DH', 'IH', 'N'],
//   'WITHOUT': ['W', 'IH', 'DH', 'AW', 'T'],
// };

// // Letter-to-phoneme rules for unknown words
// const letterToPhonemeRules = {
//   // Vowels
//   'A': ['AE'], 'E': ['EH'], 'I': ['IH'], 'O': ['AO'], 'U': ['AH'],
//   // Consonants
//   'B': ['B'], 'C': ['K'], 'D': ['D'], 'F': ['F'], 'G': ['G'],
//   'H': ['HH'], 'J': ['JH'], 'K': ['K'], 'L': ['L'], 'M': ['M'],
//   'N': ['N'], 'P': ['P'], 'Q': ['K'], 'R': ['R'], 'S': ['S'],
//   'T': ['T'], 'V': ['V'], 'W': ['W'], 'X': ['K', 'S'], 'Y': ['Y'],
//   'Z': ['Z']
// };

// const DEMO_TEXTS = [
//   {
//     text: "Hello, how are you today?",
//     label: "👋 Greeting"
//   },
//   {
//     text: "Welcome to our virtual assistant system.",
//     label: "🤖 Introduction"
//   },
//   {
//     text: "The weather today is sunny and warm.",
//     label: "☀️ Weather"
//   },
//   {
//     text: "Thank you for using our service.",
//     label: "🙏 Thanks"
//   },
//   {
//     text: "Please wait while I process your request.",
//     label: "⏳ Processing"
//   },
//   {
//     text: "Yes, I can help you with that.",
//     label: "✅ Confirmation"
//   },
//   {
//     text: "Sorry, I didn't understand that.",
//     label: "❌ Apology"
//   },
//   {
//     text: "The quick brown fox jumps over the lazy dog.",
//     label: "🦊 Fun Sentence"
//   },
//   {
//     text: "Artificial intelligence is transforming our world.",
//     label: "🧠 Tech Fact"
//   },
//   {
//     text: "Goodbye, have a nice day!",
//     label: "👋 Farewell"
//   }
// ];


// // Function to convert text to phonemes using dictionary and rules
// function textToPhonemes(text) {
//   const words = text.toUpperCase().split(/\s+/);
//   const phonemes = ['SIL']; // Start with silence
  
//   words.forEach((word, wordIndex) => {
//     // Remove punctuation
//     const cleanWord = word.replace(/[^A-Z]/g, '');
    
//     if (cleanWord.length > 0) {
//       // Check if word is in dictionary
//       if (pronunciationDictionary[cleanWord]) {
//         phonemes.push(...pronunciationDictionary[cleanWord]);
//       } else {
//         // Use letter-to-phoneme rules for unknown words
//         const wordPhonemes = [];
//         for (let i = 0; i < cleanWord.length; i++) {
//           const letter = cleanWord[i];
//           if (letterToPhonemeRules[letter]) {
//             wordPhonemes.push(...letterToPhonemeRules[letter]);
//           }
//         }
//         phonemes.push(...wordPhonemes);
//       }
      
//       // Add silence between words (but not after the last word)
//       if (wordIndex < words.length - 1) {
//         phonemes.push('SIL');
//       }
//     }
//   });
  
//   // End with silence
//   phonemes.push('SIL');
  
//   return phonemes;
// }

// // // Function to get male voice
// function getMaleVoice() {
//   const synth = window.speechSynthesis;
//   const voices = synth.getVoices();
  
//   const maleVoiceKeywords = [
//     'google uk male', 'microsoft david', 'alex', 'daniel', 'thomas',
//     'male', 'man', 'deep', 'low', 'david', 'mark', 'paul'
//   ];
  
//   const maleVoice = voices.find(voice => {
//     const voiceName = voice.name.toLowerCase();
//     return maleVoiceKeywords.some(keyword => voiceName.includes(keyword));
//   });
  
//   if (!maleVoice) {
//     const deeperVoice = voices.find(voice => 
//       voice.name.toLowerCase().includes('deep') || 
//       voice.name.toLowerCase().includes('low')
//     );
//     return deeperVoice || voices[0];
//   }
  
//   return maleVoice;
// }
// // Function to update lip sync animation
// function updateTimedLipSync(totalAudioDuration, phonemeSequence) {
//   // Check for empty or undefined phoneme sequence
//   if (!phonemeSequence || phonemeSequence.length === 0 || !window.wolf3dHeadMesh) {
//     console.error('Error: Phoneme sequence is empty or undefined.');
//     stopLipSync();
//     return;
//   }

//   // Ensure character timestamps match phoneme sequence length
//   if (characterTimestamps.length !== phonemeSequence.length) {
//     console.error('Error: characterTimestamps array does not match phonemeSequence length.');
//     stopLipSync();
//     return;
//   }

//   const mesh = window.wolf3dHeadMesh;
//   const now = Date.now();
//   const elapsed = (now - lipSyncStartTime) / 1000;

//   // Check if animation should stop
//   if (elapsed >= totalAudioDuration) {
//     stopLipSync();
//     return;
//   }

//   // Find current phoneme based on elapsed time
//   let currentPhonemeIndex = 0;
//   for (let i = 0; i < characterTimestamps.length; i++) {
//     if (elapsed >= characterTimestamps[i]) {
//       currentPhonemeIndex = i;
//     } else {
//       break;
//     }
//   }

//   // Ensure we don't exceed array bounds
//   currentPhonemeIndex = Math.min(currentPhonemeIndex, phonemeSequence.length - 1);

//   // Get current and next phoneme for interpolation
//   const currentPhoneme = phonemeSequence[currentPhonemeIndex];
//   const nextPhonemeIndex = Math.min(currentPhonemeIndex + 1, phonemeSequence.length - 1);
//   const nextPhoneme = phonemeSequence[nextPhonemeIndex];

//   // Calculate interpolation factor
//   let t = 0;
//   if (currentPhonemeIndex < characterTimestamps.length - 1) {
//     const currentTime = characterTimestamps[currentPhonemeIndex];
//     const nextTime = characterTimestamps[nextPhonemeIndex];
//     const segmentDuration = nextTime - currentTime;
    
//     if (segmentDuration > 0) {
//       t = Math.min((elapsed - currentTime) / segmentDuration, 1);
//     }
//   }

//   // Get morph targets for current and next phonemes
//   const currentMorph = phonemeToMorphMap[currentPhoneme] || defaultMorph;
//   const nextMorph = phonemeToMorphMap[nextPhoneme] || defaultMorph;

//   // Ensure 'targets' exists before accessing them
//   if (!currentMorph.targets || !nextMorph.targets) {
//     console.error('Invalid morph targets for phoneme:', currentPhoneme, nextPhoneme);
//     return;
//   }

//   // Reset all morph target influences to 0
//   if (mesh.morphTargetInfluences) {
//     for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
//       mesh.morphTargetInfluences[i] = 0;
//     }
//   }

//   // Collect all morph targets involved
//   const allTargets = new Set([...currentMorph.targets, ...nextMorph.targets]);

//   // Interpolate weights for each morph target
//   allTargets.forEach(targetName => {
//     const index = mesh.morphTargetDictionary[targetName];
//     if (index === undefined || index >= mesh.morphTargetInfluences.length) return;

//     const currentIndexInTargets = currentMorph.targets.indexOf(targetName);
//     const nextIndexInTargets = nextMorph.targets.indexOf(targetName);

//     const currentWeight = currentIndexInTargets >= 0 ? currentMorph.weights[currentIndexInTargets] : 0;
//     const nextWeight = nextIndexInTargets >= 0 ? nextMorph.weights[nextIndexInTargets] : 0;

//     // Linear interpolation between current and next weights
//     const blendedWeight = (1 - t) * currentWeight + t * nextWeight;
//     mesh.morphTargetInfluences[index] = blendedWeight;
//   });

//   // Continue animation
//   lipSyncAnimationId = requestAnimationFrame(() => updateTimedLipSync(totalAudioDuration, phonemeSequence));
// }

// // Define stopLipSync function
// function stopLipSync() {
//   lipSyncActive = false;
//   if (lipSyncAnimationId) {
//     cancelAnimationFrame(lipSyncAnimationId);
//     lipSyncAnimationId = null;
//   }

//   // Reset morph targets
//   if (window.wolf3dHeadMesh && window.wolf3dHeadMesh.morphTargetInfluences) {
//     const mesh = window.wolf3dHeadMesh;
//     for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
//       mesh.morphTargetInfluences[i] = 0;
//     }
//   }
// }

// // Function to calculate the character timestamps based on audio duration
// function populateCharacterTimestamps(phonemeSequence, audioDuration) {
//   const timestamps = [];
//   const segmentDuration = audioDuration / phonemeSequence.length;
//   let totalDuration = 0;

//   phonemeSequence.forEach(() => {
//     totalDuration += segmentDuration;
//     timestamps.push(totalDuration);
//   });

//   return timestamps;
// }

// // React component (Avatar)
// export function Avatar(props) {
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [currentText, setCurrentText] = useState("");
//   const [availableVoices, setAvailableVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);


//   const phonemeSequenceRef = useRef([]);
//   const { nodes, materials } = useGLTF('/models/model.glb');
//   const group = useRef();
//   const synth = window.speechSynthesis;

//   useEffect(() => {
//     if (nodes && nodes.Wolf3D_Head) {
//       window.wolf3dHeadMesh = nodes.Wolf3D_Head;
//       // Initialize morph target influences
//       if (window.wolf3dHeadMesh.morphTargetInfluences) {
//         for (let i = 0; i < window.wolf3dHeadMesh.morphTargetInfluences.length; i++) {
//           window.wolf3dHeadMesh.morphTargetInfluences[i] = 0;
//         }
//       }
//     } else {
//       console.error('Wolf3D_Head mesh not found!');
//     }
//   }, [nodes]);

//     useEffect(() => {
//     // Load voices
//     const loadVoices = () => {
//       const voices = synth.getVoices();
//       setAvailableVoices(voices);
//       const maleVoice = getMaleVoice();
//       setSelectedVoice(maleVoice);
//     };

//     loadVoices();
    
//     // Some browsers load voices asynchronously
//     synth.onvoiceschanged = loadVoices;

//     if (nodes && nodes.Wolf3D_Head) {
//       window.wolf3dHeadMesh = nodes.Wolf3D_Head;
//       if (window.wolf3dHeadMesh.morphTargetInfluences) {
//         for (let i = 0; i < window.wolf3dHeadMesh.morphTargetInfluences.length; i++) {
//           window.wolf3dHeadMesh.morphTargetInfluences[i] = 0;
//         }
//       }
//     }

//     return () => {
//       if (synth) synth.cancel();
//       stopLipSync();
//     };
//   }, [nodes, synth]);

//   // Function to trigger speech synthesis
//   const speakText = (text) => {
//     if (!synth || !text.trim()) return;

//     // Stop any ongoing speech first
//     synth.cancel();
//     stopLipSync();

//     const utterance = new SpeechSynthesisUtterance(text);
//     setCurrentText(text);

//     utterance.onstart = () => {
//       setIsSpeaking(true);
//       console.log("Speech started:", text);
      
//       // Convert text to phonemes
//       const phonemes = textToPhonemes(text);
//       phonemeSequenceRef.current = phonemes;
      
//       // Calculate audio duration (more accurate estimation)
//       const wordCount = text.split(/\s+/).length;
//       const audioDuration = Math.max(wordCount * 0.4, 2); // Minimum 2 seconds
      
//       lipSyncStartTime = Date.now();
//       lipSyncActive = true;

//       characterTimestamps = populateCharacterTimestamps(phonemes, audioDuration);
      
//       console.log("Phoneme sequence:", phonemes);
//       console.log("Audio duration:", audioDuration);
//       console.log("Timestamps:", characterTimestamps);

//       // Start lip sync
//       setTimeout(() => {
//         if (phonemeSequenceRef.current.length > 0) {
//           updateTimedLipSync(audioDuration, phonemeSequenceRef.current);
//         }
//       }, 50);
//     };

//     utterance.onend = () => {
//       setIsSpeaking(false);
//       setCurrentText("");
//       console.log("Speech ended");
//       stopLipSync();
//     };

//     utterance.onerror = (event) => {
//       console.error("Speech synthesis error:", event);
//       setIsSpeaking(false);
//       setCurrentText("");
//       stopLipSync();
//     };

//     // Start speech synthesis
//     synth.speak(utterance);
//   };

//   // Button handler for speaking with custom text
//   const handleSpeak = () => {
//     const text = prompt("Enter text to speak:", "Hello, how are you today?");
//     if (text) {
//       speakText(text);
//     }
//   };


//   const handleStopSpeaking = () => {
//     synth.cancel();
//     stopLipSync();
//     setIsSpeaking(false);
//     setCurrentText("");
//   };

//   // Demo handler with predefined texts
//   const handleDemoSpeak = (demoText) => {
//     speakText(demoText);
//   };

//   const handleVoiceChange = (voiceName) => {
//     const voice = availableVoices.find(v => v.name === voiceName);
//     if (voice) {
//       setSelectedVoice(voice);
//     }
//   };

//   // Cleanup effect
//   useEffect(() => {
//     return () => {
//       if (synth) {
//         synth.cancel();
//       }
//       stopLipSync();
//     };
//   }, [synth]);

  

//   return (
//     <>
//      <Html center>
//         <div style={{
//           position: "absolute",
//            top: "20px",
//           left: "50%",
//            transform: "translateX(-50%)",
//            zIndex: "2000",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           alignItems: "center",
//           maxWidth: "90vw"
//         }}>
//           {/* Voice Selection */}
//            <div style={{
//              padding: "10px",
//              backgroundColor: "rgba(0,0,0,0.8)",
//             borderRadius: "10px",
//             color: "white",
//             textAlign: "center"
//           }}>
//             <div style={{ fontSize: "12px", marginBottom: "5px" }}>🎙️ Voice: {selectedVoice?.name || 'Default'}</div>
//             <select 
//               onChange={(e) => handleVoiceChange(e.target.value)}
//               style={{
//                 padding: "5px",
//                 fontSize: "12px",
//                 borderRadius: "5px",
//                 border: "none",
//                 backgroundColor: "#333",
//                 color: "white"
//               }}
//             >
//               {availableVoices.map(voice => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Main Speak Button */}
//           <button
//             style={{
//               padding: "12px 24px",
//               backgroundColor: isSpeaking ? "#ff9800" : "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "25px",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//               minWidth: "200px"
//             }}
//             onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
//           >
//             {isSpeaking ? "⏹️ Stop Speaking" : "🎤 Speak Text"}
//           </button>
          
//           {/* Current Speech Display */}
//           {isSpeaking && (
//             <div style={{
//               padding: "15px",
//               backgroundColor: "rgba(0,0,0,0.9)",
//               color: "white",
//               borderRadius: "10px",
//               textAlign: "center",
//               fontSize: "14px",
//               maxWidth: "300px",
//               border: "2px solid #4CAF50"
//             }}>
//               <div style={{fontSize: "12px", color: "#4CAF50", marginBottom: "5px"}}>🗣️ SPEAKING</div>
//               "{currentText}"
//             </div>
//           )}

//            {/* Demo Buttons Grid */}
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: "8px",
//             maxWidth: "400px",
//             marginTop: "10px"
//           }}>
//             {DEMO_TEXTS.map((demo, index) => (
//               <button
//                 key={index}
//                 style={{
//                   padding: "8px 12px",
//                   backgroundColor: "#2196F3",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "20px",
//                   cursor: "pointer",
//                   fontSize: "11px",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   maxWidth: "180px"
//                 }}
//                 onClick={() => handleDemoSpeak(demo.text)}
//                 title={demo.text}
//                 disabled={isSpeaking}
//               >
//                 {demo.label}
//               </button>
//             ))}
//           </div>

//            {/* Quick Action Buttons */}
//           <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#FF5722",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("Stop! Wait a moment.")}
//               disabled={isSpeaking}
//             >
//               ⚠️ Stop
//             </button>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#9C27B0",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("Yes, that's correct!")}
//               disabled={isSpeaking}
//             >
//               👍 Yes
//             </button>
//             <button
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: "#607D8B",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontSize: "10px"
//               }}
//               onClick={() => speakText("No, that's not right.")}
//               disabled={isSpeaking}
//             >
//               👎 No
//             </button>
//           </div>
//         </div>
//       </Html>

//       <group {...props} dispose={null} ref={group}>
//         <primitive object={nodes.Hips} />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Body.geometry}
//           material={materials.Wolf3D_Body}
//           skeleton={nodes.Wolf3D_Body.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
//           material={materials.Wolf3D_Outfit_Bottom}
//           skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
//           material={materials.Wolf3D_Outfit_Footwear}
//           skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Outfit_Top.geometry}
//           material={materials.Wolf3D_Outfit_Top}
//           skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Wolf3D_Hair.geometry}
//           material={materials.Wolf3D_Hair}
//           skeleton={nodes.Wolf3D_Hair.skeleton}
//         />
//         <skinnedMesh
//           name="EyeLeft"
//           geometry={nodes.EyeLeft.geometry}
//           material={materials.Wolf3D_Eye}
//           skeleton={nodes.EyeLeft.skeleton}
//           morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
//           morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="EyeRight"
//           geometry={nodes.EyeRight.geometry}
//           material={materials.Wolf3D_Eye}
//           skeleton={nodes.EyeRight.skeleton}
//           morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
//           morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Glasses"
//           geometry={nodes.Wolf3D_Glasses.geometry}
//           material={materials.Wolf3D_Glasses}
//           skeleton={nodes.Wolf3D_Glasses.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Glasses.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Glasses.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Head"
//           geometry={nodes.Wolf3D_Head.geometry}
//           material={materials.Wolf3D_Skin}
//           skeleton={nodes.Wolf3D_Head.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
//         />
//         <skinnedMesh
//           name="Wolf3D_Teeth"
//           geometry={nodes.Wolf3D_Teeth.geometry}
//           material={materials.Wolf3D_Teeth}
//           skeleton={nodes.Wolf3D_Teeth.skeleton}
//           morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
//           morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
//         />
//       </group>
//     </>
//   );
// }

// useGLTF.preload('/models/model.glb');

import { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced phoneme-to-morph map with better accuracy
const phonemeToMorphMap = {
  // Vowels - More precise mappings
  'AA': { targets: ['viseme_aa', 'viseme_O'], weights: [0.8, 0.2] }, // father
  'AE': { targets: ['viseme_aa', 'viseme_E'], weights: [0.7, 0.3] }, // cat
  'AH': { targets: ['viseme_aa', 'viseme_U'], weights: [0.6, 0.2] }, // but
  'AO': { targets: ['viseme_O', 'viseme_aa'], weights: [0.9, 0.1] }, // dog
  'AW': { targets: ['viseme_O', 'viseme_U', 'viseme_aa'], weights: [0.6, 0.3, 0.1] }, // cow
  'AY': { targets: ['viseme_aa', 'viseme_I', 'viseme_E'], weights: [0.5, 0.4, 0.1] }, // eye
  'EH': { targets: ['viseme_E', 'viseme_aa'], weights: [0.9, 0.1] }, // bed
  'ER': { targets: ['viseme_RR', 'viseme_aa', 'viseme_U'], weights: [0.7, 0.2, 0.1] }, // bird
  'EY': { targets: ['viseme_E', 'viseme_I'], weights: [0.8, 0.2] }, // day
  'IH': { targets: ['viseme_I', 'viseme_E'], weights: [0.8, 0.2] }, // sit
  'IY': { targets: ['viseme_I', 'viseme_E'], weights: [0.9, 0.1] }, // see
  'OW': { targets: ['viseme_O', 'viseme_U'], weights: [0.8, 0.2] }, // go
  'OY': { targets: ['viseme_O', 'viseme_I'], weights: [0.7, 0.3] }, // boy
  'UH': { targets: ['viseme_U', 'viseme_O'], weights: [0.8, 0.2] }, // book
  'UW': { targets: ['viseme_U', 'viseme_O'], weights: [0.9, 0.1] }, // too
  
  // Consonants - More accurate articulations
  'B': { targets: ['viseme_PP', 'viseme_sil'], weights: [1.0, 0.0] }, // bilabial
  'CH': { targets: ['viseme_CH', 'viseme_SH'], weights: [0.8, 0.2] }, // church
  'D': { targets: ['viseme_DD', 'viseme_nn'], weights: [0.9, 0.1] }, // dog
  'DH': { targets: ['viseme_TH', 'viseme_DD'], weights: [0.9, 0.1] }, // this
  'F': { targets: ['viseme_FF', 'viseme_TH'], weights: [1.0, 0.0] }, // fish
  'G': { targets: ['viseme_kk', 'viseme_nn'], weights: [0.9, 0.1] }, // go
  'HH': { targets: ['viseme_aa', 'viseme_sil'], weights: [0.4, 0.6] }, // hello
  'JH': { targets: ['viseme_CH', 'viseme_DD'], weights: [0.8, 0.2] }, // jump
  'K': { targets: ['viseme_kk', 'viseme_CH'], weights: [1.0, 0.0] }, // cat
  'L': { targets: ['viseme_nn', 'viseme_DD'], weights: [0.8, 0.2] }, // light
  'M': { targets: ['viseme_PP', 'viseme_nn'], weights: [1.0, 0.0] }, // man
  'N': { targets: ['viseme_nn', 'viseme_DD'], weights: [1.0, 0.0] }, // no
  'NG': { targets: ['viseme_nn', 'viseme_kk'], weights: [0.9, 0.1] }, // sing
  'P': { targets: ['viseme_PP', 'viseme_sil'], weights: [1.0, 0.0] }, // pet
  'R': { targets: ['viseme_RR', 'viseme_U'], weights: [0.9, 0.1] }, // red
  'S': { targets: ['viseme_SS', 'viseme_nn'], weights: [1.0, 0.0] }, // sun
  'SH': { targets: ['viseme_CH', 'viseme_SS'], weights: [0.9, 0.1] }, // she
  'T': { targets: ['viseme_DD', 'viseme_nn'], weights: [0.9, 0.1] }, // top
  'TH': { targets: ['viseme_TH', 'viseme_SS'], weights: [1.0, 0.0] }, // think
  'V': { targets: ['viseme_FF', 'viseme_DD'], weights: [0.9, 0.1] }, // voice
  'W': { targets: ['viseme_U', 'viseme_O'], weights: [0.8, 0.2] }, // we
  'Y': { targets: ['viseme_I', 'viseme_E'], weights: [0.7, 0.3] }, // yes
  'Z': { targets: ['viseme_SS', 'viseme_DD'], weights: [0.9, 0.1] }, // zoo
  'ZH': { targets: ['viseme_CH', 'viseme_SS'], weights: [0.8, 0.2] }, // measure
  
  // Silence and pauses
  'SIL': { targets: ['viseme_sil'], weights: [1.0] },
  'PAUSE': { targets: ['viseme_sil'], weights: [0.8] },
};

// Default fallback for unknown phonemes
const defaultMorph = { targets: ['viseme_sil'], weights: [1.0] };

let lipSyncActive = false;
let lipSyncAnimationId = null;
let lipSyncStartTime = 0;

// Enhanced pronunciation dictionary with more accurate phoneme sequences
const pronunciationDictionary = {
  // Common words with improved accuracy
  'HELLO': ['HH', 'EH', 'L', 'OW'],
  'GOOD': ['G', 'UH', 'D'],
  'MORNING': ['M', 'AO', 'R', 'N', 'IH', 'NG'],
  'HOW': ['HH', 'AW'],
  'ARE': ['AA', 'R'],
  'YOU': ['Y', 'UW'],
  'TODAY': ['T', 'UH', 'D', 'EY'],
  'WHAT': ['W', 'AH', 'T'],
  'WHERE': ['W', 'EH', 'R'],
  'WHEN': ['W', 'EH', 'N'],
  'WHY': ['W', 'AY'],
  'WHO': ['HH', 'UW'],
  'WHICH': ['W', 'IH', 'CH'],
  'THIS': ['DH', 'IH', 'S'],
  'THAT': ['DH', 'AE', 'T'],
  'THESE': ['DH', 'IY', 'Z'],
  'THOSE': ['DH', 'OW', 'Z'],
  'THE': ['DH', 'AH'],
  'A': ['AH'],
  'AN': ['AE', 'N'],
  'AND': ['AE', 'N', 'D'],
  'BUT': ['B', 'AH', 'T'],
  'OR': ['AO', 'R'],
  'FOR': ['F', 'AO', 'R'],
  'WITH': ['W', 'IH', 'DH'],
  'ABOUT': ['AH', 'B', 'AW', 'T'],
  'AFTER': ['AE', 'F', 'T', 'ER'],
  'BEFORE': ['B', 'IH', 'F', 'AO', 'R'],
  'BETWEEN': ['B', 'IH', 'T', 'W', 'IY', 'N'],
  'INTO': ['IH', 'N', 'T', 'UW'],
  'THROUGH': ['TH', 'R', 'UW'],
  'UNDER': ['AH', 'N', 'D', 'ER'],
  'OVER': ['OW', 'V', 'ER'],
  
  // Improved consonant clusters
  'STRONG': ['S', 'T', 'R', 'AO', 'NG'],
  'SPRING': ['S', 'P', 'R', 'IH', 'NG'],
  'THREE': ['TH', 'R', 'IY'],
  'SPLIT': ['S', 'P', 'L', 'IH', 'T'],
  'SCRATCH': ['S', 'K', 'R', 'AE', 'CH'],
};

// Enhanced letter-to-phoneme rules with context sensitivity
const letterToPhonemeRules = (word, index) => {
  const letter = word[index];
  const prevLetter = index > 0 ? word[index - 1] : '';
  const nextLetter = index < word.length - 1 ? word[index + 1] : '';
  
  switch (letter) {
    case 'A':
      if (nextLetter === 'I' || nextLetter === 'Y') return ['EY'];
      if (prevLetter === 'W') return ['AO'];
      return ['AE'];
    
    case 'C':
      if (nextLetter === 'E' || nextLetter === 'I' || nextLetter === 'Y') return ['S'];
      return ['K'];
    
    case 'E':
      if (index === word.length - 1) return []; // Silent final E
      if (nextLetter === 'A') return ['EH'];
      return ['EH'];
    
    case 'G':
      if (nextLetter === 'E' || nextLetter === 'I' || nextLetter === 'Y') return ['JH'];
      return ['G'];
    
    case 'O':
      if (nextLetter === 'I') return ['OY'];
      if (prevLetter === 'W') return ['UH'];
      return ['AO'];
    
    case 'S':
      if (prevLetter && 'AEIOU'.includes(prevLetter) && nextLetter && 'AEIOU'.includes(nextLetter)) 
        return ['Z'];
      return ['S'];
    
    case 'T':
      if (nextLetter === 'H') return ['TH'];
      if (prevLetter === 'S' && index === word.length - 1) return []; // Silent T in ST
      return ['T'];
    
    case 'X':
      if (index === 0) return ['Z'];
      return ['K', 'S'];
    
    case 'Y':
      if (index === 0) return ['Y'];
      if (prevLetter && 'BCDFGHJKLMNPQRSTVWXZ'.includes(prevLetter)) return ['AY'];
      return ['IH'];
    
    default:
      // Default mappings
      const defaultMap = {
        'A': ['AE'], 'B': ['B'], 'D': ['D'], 'F': ['F'], 'H': ['HH'],
        'I': ['IH'], 'J': ['JH'], 'K': ['K'], 'L': ['L'], 'M': ['M'],
        'N': ['N'], 'O': ['AO'], 'P': ['P'], 'Q': ['K'], 'R': ['R'],
        'U': ['AH'], 'V': ['V'], 'W': ['W'], 'Z': ['Z']
      };
      return defaultMap[letter] || [];
  }
};

const DEMO_TEXTS = [
  {
    text: "Hello, how are you today?",
    label: "👋 Greeting"
  },
  {
    text: "Welcome to our virtual assistant system.",
    label: "🤖 Introduction"
  },
  {
    text: "The weather today is sunny and warm.",
    label: "☀️ Weather"
  },
  {
    text: "Thank you for using our service.",
    label: "🙏 Thanks"
  },
  {
    text: "Please wait while I process your request.",
    label: "⏳ Processing"
  },
  {
    text: "Yes, I can help you with that.",
    label: "✅ Confirmation"
  },
  {
    text: "Sorry, I didn't understand that.",
    label: "❌ Apology"
  },
  {
    text: "The quick brown fox jumps over the lazy dog.",
    label: "🦊 Fun Sentence"
  },
  {
    text: "Artificial intelligence is transforming our world.",
    label: "🧠 Tech Fact"
  },
  {
    text: "Goodbye, have a nice day!",
    label: "👋 Farewell"
  }
];

// Enhanced text-to-phoneme conversion
function textToPhonemes(text) {
  const words = text.toUpperCase().split(/\s+/);
  const phonemes = ['SIL']; // Start with silence
  
  words.forEach((word, wordIndex) => {
    const cleanWord = word.replace(/[^A-Z]/g, '');
    
    if (cleanWord.length > 0) {
      // Check dictionary first
      if (pronunciationDictionary[cleanWord]) {
        phonemes.push(...pronunciationDictionary[cleanWord]);
      } else {
        // Use enhanced letter-to-phoneme conversion
        const wordPhonemes = [];
        for (let i = 0; i < cleanWord.length; i++) {
          const letterPhonemes = letterToPhonemeRules(cleanWord, i);
          wordPhonemes.push(...letterPhonemes.filter(p => p !== ''));
        }
        if (wordPhonemes.length > 0) {
          phonemes.push(...wordPhonemes);
        }
      }
      
      // Add shorter pause between words
      if (wordIndex < words.length - 1) {
        phonemes.push('PAUSE');
      }
    }
  });
  
  phonemes.push('SIL');
  return phonemes.filter(p => p !== '');
}

// Enhanced timing calculation based on phoneme complexity
function calculatePhonemeDurations(phonemes) {
  const durations = [];
  const baseDuration = 0.15; // Base duration in seconds
  
  phonemes.forEach(phoneme => {
    let duration = baseDuration;
    
    // Adjust duration based on phoneme type
    if (['SIL', 'PAUSE'].includes(phoneme)) {
      duration = 0.2; // Longer pauses
    } else if (['AA', 'AE', 'AH', 'AO', 'EH', 'ER', 'IH', 'IY', 'OW', 'UH', 'UW'].includes(phoneme)) {
      duration = 0.2; // Vowels are longer
    } else if (['B', 'P', 'T', 'D', 'K', 'G'].includes(phoneme)) {
      duration = 0.1; // Stops are shorter
    } else if (['M', 'N', 'NG', 'L', 'R'].includes(phoneme)) {
      duration = 0.18; // Nasals and liquids medium
    }
    
    durations.push(duration);
  });
  
  return durations;
}

// Helper function to get morph weight safely
function getMorphWeight(morph, targetName) {
  if (!morph.targets || !morph.weights) return 0;
  const index = morph.targets.indexOf(targetName);
  return index >= 0 ? morph.weights[index] : 0;
}

// Enhanced lip sync animation with better interpolation
function updateTimedLipSync(phonemeSequence, phonemeDurations) {
  if (!phonemeSequence || phonemeSequence.length === 0 || !window.wolf3dHeadMesh) {
    console.error('Error: Invalid phoneme sequence or mesh');
    stopLipSync();
    return;
  }

  const mesh = window.wolf3dHeadMesh;
  const now = Date.now();
  const elapsed = (now - lipSyncStartTime) / 1000;

  // Calculate total duration and check if finished
  const totalDuration = phonemeDurations.reduce((sum, dur) => sum + dur, 0);
  if (elapsed >= totalDuration) {
    stopLipSync();
    return;
  }

  // Find current phoneme index based on cumulative durations
  let accumulatedTime = 0;
  let currentPhonemeIndex = 0;
  
  for (let i = 0; i < phonemeDurations.length; i++) {
    accumulatedTime += phonemeDurations[i];
    if (elapsed < accumulatedTime) {
      currentPhonemeIndex = i;
      break;
    }
  }

  // Ensure valid index
  currentPhonemeIndex = Math.min(currentPhonemeIndex, phonemeSequence.length - 1);

  // Get current and surrounding phonemes for smoother transitions
  const prevPhonemeIndex = Math.max(currentPhonemeIndex - 1, 0);
  const nextPhonemeIndex = Math.min(currentPhonemeIndex + 1, phonemeSequence.length - 1);
  
  const prevPhoneme = phonemeSequence[prevPhonemeIndex];
  const currentPhoneme = phonemeSequence[currentPhonemeIndex];
  const nextPhoneme = phonemeSequence[nextPhonemeIndex];

  // Calculate interpolation factors
  let accumulatedPrev = phonemeDurations.slice(0, currentPhonemeIndex).reduce((sum, dur) => sum + dur, 0);
  const currentStartTime = accumulatedPrev;
  const currentDuration = phonemeDurations[currentPhonemeIndex];
  
  const t = currentDuration > 0 ? Math.min((elapsed - currentStartTime) / currentDuration, 1) : 0;

  // Get morph targets with blending
  const prevMorph = phonemeToMorphMap[prevPhoneme] || defaultMorph;
  const currentMorph = phonemeToMorphMap[currentPhoneme] || defaultMorph;
  const nextMorph = phonemeToMorphMap[nextPhoneme] || defaultMorph;

  // Reset all morph targets
  if (mesh.morphTargetInfluences) {
    for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
      mesh.morphTargetInfluences[i] = 0;
    }
  }

  // Enhanced blending: smooth transition between previous, current, and next phonemes
  const allTargets = new Set([
    ...(prevMorph.targets || []),
    ...(currentMorph.targets || []),
    ...(nextMorph.targets || [])
  ]);

  allTargets.forEach(targetName => {
    const index = mesh.morphTargetDictionary[targetName];
    if (index === undefined || index >= mesh.morphTargetInfluences.length) return;

    // Calculate weights for each phoneme in the transition
    const prevWeight = getMorphWeight(prevMorph, targetName) * Math.max(0, 1 - t - 0.3);
    const currentWeight = getMorphWeight(currentMorph, targetName) * (1 - Math.abs(t - 0.5) * 2);
    const nextWeight = getMorphWeight(nextMorph, targetName) * Math.max(0, t - 0.7);

    // Combine weights with smoothing
    const blendedWeight = prevWeight + currentWeight + nextWeight;
    mesh.morphTargetInfluences[index] = Math.min(blendedWeight, 1.0);
  });

  // Continue animation
  lipSyncAnimationId = requestAnimationFrame(() => updateTimedLipSync(phonemeSequence, phonemeDurations));
}

// Define stopLipSync function
function stopLipSync() {
  lipSyncActive = false;
  if (lipSyncAnimationId) {
    cancelAnimationFrame(lipSyncAnimationId);
    lipSyncAnimationId = null;
  }

  // Reset morph targets
  if (window.wolf3dHeadMesh && window.wolf3dHeadMesh.morphTargetInfluences) {
    const mesh = window.wolf3dHeadMesh;
    for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
      mesh.morphTargetInfluences[i] = 0;
    }
  }
}

// Enhanced function to get male voice with better compatibility
function getMaleVoice(voices) {
  if (!voices || voices.length === 0) return null;
  
  // Comprehensive list of male voice identifiers across different browsers/OS
  const maleVoiceKeywords = [
    'google uk male', 'microsoft david', 'microsoft mark', 'alex', 'daniel', 'thomas',
    'male', 'man', 'deep', 'low', 'david', 'mark', 'paul', 'fred', 'victor',
    'google us male', 'english male', 'en-us-male', 'en-gb-male'
  ];

  // Try to find exact male voice matches
  const maleVoice = voices.find(voice => {
    const voiceName = voice.name.toLowerCase();
    return maleVoiceKeywords.some(keyword => voiceName.includes(keyword));
  });

  if (maleVoice) return maleVoice;

  // Fallback: look for voices that sound male based on name patterns
  const fallbackMale = voices.find(voice => {
    const voiceName = voice.name.toLowerCase();
    const maleIndicators = ['david', 'mark', 'paul', 'michael', 'john', 'steve', 'chris', 'brian'];
    return maleIndicators.some(name => voiceName.includes(name));
  });

  if (fallbackMale) return fallbackMale;

  // Final fallback: prefer deeper/lower pitched voices
  const deeperVoice = voices.find(voice => 
    voice.name.toLowerCase().includes('deep') || 
    voice.name.toLowerCase().includes('low') ||
    voice.name.toLowerCase().includes('base')
  );

  return deeperVoice || voices[0];
}

// React component (Avatar)
export function Avatar(props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const phonemeSequenceRef = useRef([]);
  const { nodes, materials } = useGLTF('/models/model.glb');
  const group = useRef();

  // Enhanced voice loading with retry mechanism
  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      
      if (voices.length > 0) {
        console.log('Available voices:', voices.map(v => v.name));
        setAvailableVoices(voices);
        
        const maleVoice = getMaleVoice(voices);
        if (maleVoice) {
          setSelectedVoice(maleVoice);
          console.log('Selected male voice:', maleVoice.name);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0]);
          console.log('Fallback to first voice:', voices[0].name);
        }
        
        setVoicesLoaded(true);
      } else {
        // Retry after a short delay if voices aren't loaded yet
        console.log('Voices not loaded yet, retrying...');
        setTimeout(loadVoices, 500);
      }
    };

    // Initial load
    loadVoices();
    
    // Some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      stopLipSync();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (nodes && nodes.Wolf3D_Head) {
      window.wolf3dHeadMesh = nodes.Wolf3D_Head;
      // Initialize morph target influences
      if (window.wolf3dHeadMesh.morphTargetInfluences) {
        for (let i = 0; i < window.wolf3dHeadMesh.morphTargetInfluences.length; i++) {
          window.wolf3dHeadMesh.morphTargetInfluences[i] = 0;
        }
      }
    } else {
      console.error('Wolf3D_Head mesh not found!');
    }
  }, [nodes]);

  // Enhanced speech synthesis with better timing
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (!synth || !text.trim()) {
      console.error('Speech synthesis not available or empty text');
      return;
    }

    // Stop any ongoing speech first
    synth.cancel();
    stopLipSync();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the selected voice if available
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.rate = 0.9; // Slightly slower for better lip sync
      utterance.pitch = 0.8; // Slightly lower pitch for male voice
    }

    setCurrentText(text);

    utterance.onstart = () => {
      setIsSpeaking(true);
      
      // Convert text to phonemes
      const phonemes = textToPhonemes(text);
      const durations = calculatePhonemeDurations(phonemes);
      phonemeSequenceRef.current = phonemes;
      
      lipSyncStartTime = Date.now();
      lipSyncActive = true;

      console.log("Phoneme sequence:", phonemes);
      console.log("Phoneme durations:", durations);
      console.log("Total estimated duration:", durations.reduce((a, b) => a + b, 0));

      // Start lip sync with precise timing
      setTimeout(() => {
        if (phonemes.length > 0) {
          updateTimedLipSync(phonemes, durations);
        }
      }, 50);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentText("");
      console.log("Speech ended");
      stopLipSync();
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      setCurrentText("");
      stopLipSync();
    };

    // Start speech synthesis
    synth.speak(utterance);
  };

  // Button handler for speaking with custom text
  const handleSpeak = () => {
    const text = prompt("Enter text to speak:", "Hello, how are you today?");
    if (text) {
      speakText(text);
    }
  };

  const handleStopSpeaking = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    stopLipSync();
    setIsSpeaking(false);
    setCurrentText("");
  };

  // Demo handler with predefined texts
  const handleDemoSpeak = (demoText) => {
    speakText(demoText);
  };

  const handleVoiceChange = (voiceName) => {
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
      console.log('Voice changed to:', voice.name);
    }
  };

  // Force reload voices
  const handleReloadVoices = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    setAvailableVoices(voices);
    console.log('Voices reloaded. Available:', voices.length);
  };

  return (
    <>
      <Html center>
        <div style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "2000",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          maxWidth: "90vw"
        }}>
          {/* Voice Selection */}
          <div style={{
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "10px",
            color: "white",
            textAlign: "center",
            minWidth: "300px"
          }}>
            <div style={{ fontSize: "12px", marginBottom: "5px" }}>
              🎙️ Voice: {selectedVoice?.name || 'Loading...'} 
              {!voicesLoaded && ' (Loading voices...)'}
            </div>
            <select 
              onChange={(e) => handleVoiceChange(e.target.value)}
              value={selectedVoice?.name || ''}
              style={{
                padding: "5px",
                fontSize: "12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#333",
                color: "white",
                width: "100%"
              }}
              disabled={!voicesLoaded}
            >
              <option value="">Select a voice...</option>
              {availableVoices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang}) {voice.default ? '(Default)' : ''}
                </option>
              ))}
            </select>
            <button 
              onClick={handleReloadVoices}
              style={{
                marginTop: "5px",
                padding: "2px 8px",
                fontSize: "10px",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Reload Voices
            </button>
          </div>

          {/* Main Speak Button */}
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: isSpeaking ? "#ff9800" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              minWidth: "200px",
              opacity: voicesLoaded ? 1 : 0.6
            }}
            onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
            disabled={!voicesLoaded}
          >
            {isSpeaking ? "⏹️ Stop Speaking" : "🎤 Speak Text"}
          </button>
          
          {/* Current Speech Display */}
          {isSpeaking && (
            <div style={{
              padding: "15px",
              backgroundColor: "rgba(0,0,0,0.9)",
              color: "white",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "14px",
              maxWidth: "300px",
              border: "2px solid #4CAF50"
            }}>
              <div style={{fontSize: "12px", color: "#4CAF50", marginBottom: "5px"}}>🗣️ SPEAKING</div>
              "{currentText}"
            </div>
          )}

          {/* Demo Buttons Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
            maxWidth: "400px",
            marginTop: "10px"
          }}>
            {DEMO_TEXTS.map((demo, index) => (
              <button
                key={index}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: voicesLoaded ? "pointer" : "not-allowed",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "180px",
                  opacity: voicesLoaded ? 1 : 0.6
                }}
                onClick={() => handleDemoSpeak(demo.text)}
                title={demo.text}
                disabled={isSpeaking || !voicesLoaded}
              >
                {demo.label}
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#FF5722",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: voicesLoaded ? "pointer" : "not-allowed",
                fontSize: "10px",
                opacity: voicesLoaded ? 1 : 0.6
              }}
              onClick={() => speakText("Stop! Wait a moment.")}
              disabled={isSpeaking || !voicesLoaded}
            >
              ⚠️ Stop
            </button>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#9C27B0",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: voicesLoaded ? "pointer" : "not-allowed",
                fontSize: "10px",
                opacity: voicesLoaded ? 1 : 0.6
              }}
              onClick={() => speakText("Yes, that's correct!")}
              disabled={isSpeaking || !voicesLoaded}
            >
              👍 Yes
            </button>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#607D8B",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: voicesLoaded ? "pointer" : "not-allowed",
                fontSize: "10px",
                opacity: voicesLoaded ? 1 : 0.6
              }}
              onClick={() => speakText("No, that's not right.")}
              disabled={isSpeaking || !voicesLoaded}
            >
              👎 No
            </button>
          </div>

          {/* Debug Info */}
          {!voicesLoaded && (
            <div style={{
              padding: "10px",
              backgroundColor: "rgba(255,0,0,0.8)",
              color: "white",
              borderRadius: "5px",
              fontSize: "12px",
              textAlign: "center"
            }}>
              ⚠️ Voices loading... If this persists, check browser speech synthesis support.
            </div>
          )}
        </div>
      </Html>

      <group {...props} dispose={null} ref={group}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />

         <skinnedMesh
          name="Wolf3D_Glasses"
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Glasses.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Glasses.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </>
  );
}

useGLTF.preload('/models/model.glb');