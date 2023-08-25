import lodash from 'lodash'

const quotes = [
  'Ka-Chow!',
  "This grumpy old race car I know once told me something, 'It's just an empty cup.",
  "Oh, he's just a little bit shy, and he hates ya for killing his flowers.",
  "I knew you couldn't drive. I didn't know you couldn't read.",
  "McQueen and Sally parked beneath a tree, K-I-S-sumthin', sumthin', sumthin'… T!",
  'Fly away, Stanley, be free!',
  "You have more talent in one lug nut than a lot of cars have in their whole body. But you're stupid.",
  "I create feelings in others that they themselves don't understand.",
  "Come on. I'm a racecar, you're… a much older racecar, but under the hood, you and I are the same.",
  'Oh, take a carwash, hippie.',
  'Pitstop!',
  'He did WHAT in his cup?',
]

function getQuote() {
  return lodash.sample(quotes)
}

export default getQuote
