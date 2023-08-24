import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';

function SpeechRecognitionExample() {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice._onSpeechStart = onSpeechStart;
    Voice._onSpeechRecognized = onSpeechRecognized;
    Voice._onSpeechResults = onSpeechResults;
    

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setStarted('√');
  };

  const onSpeechRecognized = (e) => {
    setRecognized('√');
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Speech Recognition Example</Text>
      <TouchableOpacity onPress={startRecognizing}>
        <Text>Start Recognizing</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopRecognizing}>
        <Text>Stop Recognizing</Text>
      </TouchableOpacity>
      <Text>Recognized: {recognized}</Text>
      <Text>Started: {started}</Text>
      <Text>Results: {results.join(', ')}</Text>
    </View>
  );
}

export default SpeechRecognitionExample;
