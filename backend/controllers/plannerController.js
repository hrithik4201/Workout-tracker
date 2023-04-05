const openai = require('../openAIConfig');

const getWorkoutPlan = async (req, res) => {
  try {
    const text = req.body.text;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are an personal trainer who gives workout plans based on the user's inputs.",
        }, // this represents the bot and what role they will assume
        { role: 'user', content: text }, // the message that the user sends
      ],
    });

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error('error', error.response.data.error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWorkoutPlan,
};

// `Create a personalized workout plan to help the user achieve their fitness goals. The user's fitness goal is to ${fds},  and they prefer  weight training workouts. They have  beginner fitness level and prefer to workout  4-5 a week . Please provide a detailed workout plan for 30 days, including suggested exercises, reps, and sets, Format your response using HTML. Use headings, subheadings, bullet points, and bold to organize the information.`;
