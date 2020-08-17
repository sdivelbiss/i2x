const TWO_SECONDS = 2000;

const boldText = (input, wordsToBold) => {
  if (!wordsToBold.length) {
    return input;
  }
  return input.replace(
    new RegExp(wordsToBold.join("|"), "gi"),
    `<span class="spotted-word">$&</span>`
  );
};

class TranscriptLogItem {
  constructor(text, spotted, nextText) {
    if (!text) {
      return;
    }
    // Need to save text and spotted words to add onto next
    this.savedText = nextText ? `${text} ${nextText}` : text;
    this.savedSpotted = spotted;
    // Bold each bit of text individually, this allows the user to input more sporrted words on the fly and have them only
    this.text = nextText
      ? `${boldText(this.savedText, spotted)}`
      : boldText(text, spotted);
  }
}

export const transformLog = (log = []) => {
  const newLog = [];
  let endMS = 0;
  let nextStartMS = 0;
  let currentIndex = 0;

  // Loop over the log TODO: how to make this more performant
  for (let i = 0; i < log.length; i++) {
    // Get the current transcript
    const { transcript = {}, spotted = [] } = log[i];
    // Get the next item transcript if exists
    const { transcript: nextTranscript = {}, spotted: nextSpotted = [] } =
      log[i + 1] || {};

    // Assign variables to top level to track start/end
    nextStartMS = nextTranscript.startOffsetMsec;
    endMS = transcript.endOffsetMsec;

    // If i === 0, just push the text since we don't need to check the time
    if (i === 0) {
      newLog.push(
        new TranscriptLogItem(
          transcript.utterance,
          [...spotted, ...nextSpotted],
          null
        )
      );
    }
    // If the nextStartMS - endMS (current) <= 2000 then less than 2 seconds has passed since the next occurance of text
    if (nextStartMS - endMS <= TWO_SECONDS && nextStartMS - endMS >= 0) {
      // Reset the startMS and endMS to the nextTranscript times
      // startMS = nextTranscript.startOffsetMsec;
      endMS = nextTranscript.endOffsetMsec;
      // The newLog array at the current index needs to be modified and the nextTranscript utterance should be added to that text
      newLog[currentIndex] = new TranscriptLogItem(
        newLog[currentIndex].savedText,
        [...newLog[currentIndex].savedSpotted, ...nextSpotted],
        nextTranscript.utterance
      );
    } else {
      // If it is more than a 2 second gap, just add it to the array
      newLog.push(
        new TranscriptLogItem(
          nextTranscript.utterance,
          [...spotted, ...nextSpotted],
          null
        )
      );

      currentIndex++;
    }
  }
  return newLog;
};
