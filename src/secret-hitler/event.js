class Event {
  constructor(getString, nextEvents) {
    this.getString = getString;
    this.nextEvents = nextEvents;
  }
}

const events = {
  liberal: {
    truth: [
      new Event((name) => `Nobody trusts you, ${name()} kills you.`),
      new Event(() => "You form a powerful lib gang with other potential liberals...", [
        new Event((name) => `Turns out, ${name()} was lying about being a liberal and you lose.`),
        new Event(() => "Lib gang never lies, you win.")
      ]),
      new Event((name) => `${name()} is immediately suspicious of you for no reason and convinces ${name()} to kill you later in the game.`),
      new Event(() => "You do basically nothing all game and win")
    ],
    lie: [
      new Event((name) => `You get killed because people think you're a facist. After the game, when everyone finds out you lied, ${name()} throws you out the window.`),
      new Event((name) => `For some reason lying made ${name()} super sure you're a liberal. You win.`)
    ]
  },
  facist: {
    truth: [
      new Event((name) => `You join trendy facists, the leader being ${name()}, and win.`),
      new Event(() => "Nobody believes you had the confidence to tell the truth, so you fly by undetected and win.")
    ],
    lie: [
      new Event((name) => `You infiltrate the lib gang, easily convincing ${name()} of your innocence, and win.`),
      new Event((name) => `${name()} asks you a question and you laugh while answering. This blows your cover and you lose.`),
      new Event((name) => `You do a good job of convincing everyone, but for no fucking reason you decide to kill the Secret Hitler, ${name()}. God damnit.`)
    ]
  },
  either: [
    new Event(() => "Everyone yells way too much, so nobody really wins"),
    new Event(() => "Rachel's laminated cards are a delight to the touch, making everyone playing a winner.")
  ]
}
