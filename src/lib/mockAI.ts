const responses = [
  "치매 환자를 돌보시느라 정말 고생이 많으시네요. 보호자님의 감정도 중요합니다. 잠깐이라도 혼자만의 시간을 가져보시는 건 어떨까요?",
  "힘든 하루를 보내셨군요. 주간보호센터나 가족들과 돌봄을 나누는 방법을 고려해보셨나요? 보호자님의 건강도 중요합니다.",
  "환자분과의 작은 순간들도 소중합니다. 함께 산책하거나 좋아하시는 음악을 듣는 것도 좋은 방법이에요.",
  "보호자님의 마음을 이해합니다. 가까운 치매안심센터에서 무료 상담과 교육 프로그램을 제공하고 있으니 도움을 받아보세요.",
  "오늘은 어떤 일이 있으셨나요? 구체적으로 말씀해주시면 함께 해결책을 찾아볼 수 있습니다.",
  "규칙적인 일과가 치매 환자에게 도움이 됩니다. 매일 같은 시간에 식사하고 산책하는 루틴을 만들어보세요.",
  "보호자님도 충분한 휴식이 필요합니다. 단기보호 서비스를 이용해서 잠깐 쉬어가시는 것도 방법입니다.",
  "치매 환자와 대화할 때는 짧고 간단한 문장으로, 천천히 말씀해주세요. 눈을 맞추고 부드러운 어조로 대화하면 좋습니다.",
];

const empathyPhrases = [
  "보호자님의 노고가 느껴집니다.",
  "정말 힘드셨겠어요.",
  "충분히 그럴 수 있습니다.",
  "보호자님의 마음이 이해됩니다.",
];

export const getMockAIResponse = (userMessage: string): string => {
  // 사용자 메시지 분석
  const lowerMessage = userMessage.toLowerCase();

  // 감정 관련 키워드
  if (lowerMessage.includes('힘들') || lowerMessage.includes('지쳤') || lowerMessage.includes('피곤')) {
    return `${empathyPhrases[Math.floor(Math.random() * empathyPhrases.length)]} ${responses[1]}`;
  }

  if (lowerMessage.includes('화가') || lowerMessage.includes('짜증') || lowerMessage.includes('답답')) {
    return `${empathyPhrases[2]} ${responses[0]}`;
  }

  if (lowerMessage.includes('불안') || lowerMessage.includes('걱정')) {
    return `${empathyPhrases[3]} ${responses[3]}`;
  }

  // 도움 요청
  if (lowerMessage.includes('어떻게') || lowerMessage.includes('방법') || lowerMessage.includes('도움')) {
    return responses[4];
  }

  // 일상 관련
  if (lowerMessage.includes('일상') || lowerMessage.includes('하루') || lowerMessage.includes('매일')) {
    return responses[5];
  }

  // 대화 관련
  if (lowerMessage.includes('대화') || lowerMessage.includes('말') || lowerMessage.includes('소통')) {
    return responses[7];
  }

  // 기본 응답
  return responses[Math.floor(Math.random() * responses.length)];
};

export const simulateTyping = async (callback: (char: string) => void, text: string, delay: number = 30): Promise<void> => {
  for (const char of text) {
    callback(char);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};
