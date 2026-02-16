const TEXT_LIBRARY = [
  {
    id: 'aesop-tortoise-hare',
    title: 'The Tortoise and the Hare',
    author: 'Aesop',
    genre: 'Fable',
    difficulty: 'easy',
    length: 'short',
    content: `A hare once mocked a tortoise for his slow and steady pace. "You will never get anywhere crawling along like that," laughed the hare. The tortoise, untroubled, replied calmly, "I may be slow, but I always reach my destination. Let us race and see who arrives first." The hare, amused by this challenge, agreed at once. The course was set from the old oak tree to the pond at the edge of the meadow. When the race began, the hare sprinted ahead with great bursts of speed, leaving the tortoise far behind within moments. Confident in his lead, the hare decided to rest beneath a shady bush. "I have plenty of time," he told himself, and soon fell fast asleep. Meanwhile, the tortoise continued forward without pause, placing one steady foot in front of the other. He passed the sleeping hare without a word. When the hare finally awoke with a start, he saw the tortoise just a few steps from the finish line. He ran with all his might, but it was too late. The tortoise crossed first, and the watching animals cheered. Slow and steady wins the race.`,
    questions: [
      {
        question: 'Why did the hare lose the race?',
        options: ['He took a wrong turn', 'He fell asleep during the race', 'He injured his leg', 'The tortoise cheated'],
        correct: 1,
        explanation: 'The hare was so confident in his speed that he took a nap, allowing the tortoise to pass him and win.'
      },
      {
        question: 'What was the tortoise\'s attitude when mocked by the hare?',
        options: ['Angry and aggressive', 'Calm and untroubled', 'Sad and defeated', 'Confused and scared'],
        correct: 1,
        explanation: 'The tortoise remained calm and untroubled, confidently suggesting they race to settle the matter.'
      },
      {
        question: 'What is the moral of this fable?',
        options: ['Speed is the most important quality', 'Slow and steady wins the race', 'Never race against friends', 'Always take shortcuts'],
        correct: 1,
        explanation: 'The story teaches that consistent, persistent effort can overcome natural talent when that talent is wasted through overconfidence.'
      }
    ]
  },
  {
    id: 'aesop-fox-grapes',
    title: 'The Fox and the Grapes',
    author: 'Aesop',
    genre: 'Fable',
    difficulty: 'easy',
    length: 'short',
    content: `On a warm afternoon, a fox was walking through the forest when he spotted a beautiful bunch of ripe grapes hanging from a vine that had grown up along the branches of a tall tree. The grapes were plump and purple, glistening with moisture, and the fox felt a sudden hunger upon seeing them. "Those grapes look absolutely delicious," he said to himself. He backed up several paces, took a running leap, and snapped his jaws just beneath the lowest bunch. He missed. Again he tried, jumping even higher this time, but the grapes remained just beyond his reach. A third time he leaped with all his strength, stretching his body as far as it would go, but still he could not touch them. After several more attempts, the fox finally stopped. He straightened himself, lifted his nose with an air of dignity, and walked away. "Those grapes are probably sour anyway," he declared loudly. "I would not want them even if they were offered to me." It is easy to despise what you cannot have.`,
    questions: [
      {
        question: 'What did the fox do after failing to reach the grapes?',
        options: ['He asked another animal for help', 'He claimed the grapes were probably sour', 'He climbed the tree', 'He waited for them to fall'],
        correct: 1,
        explanation: 'Rather than admit defeat, the fox pretended the grapes were sour and that he did not want them anyway.'
      },
      {
        question: 'How many times did the fox attempt to reach the grapes before giving up?',
        options: ['Once', 'Twice', 'Several times', 'He never tried'],
        correct: 2,
        explanation: 'The fox made multiple attempts, jumping again and again before finally walking away.'
      },
      {
        question: 'What human behavior does this fable illustrate?',
        options: ['Generosity toward others', 'Pretending not to want what you cannot have', 'The value of hard work', 'The importance of sharing'],
        correct: 1,
        explanation: 'The fable illustrates how people sometimes disparage things they cannot obtain, rather than admitting their failure.'
      }
    ]
  },
  {
    id: 'twain-jumping-frog',
    title: 'The Celebrated Jumping Frog',
    author: 'Mark Twain',
    genre: 'Fiction',
    difficulty: 'easy',
    length: 'short',
    content: `There was a fellow once by the name of Jim Smiley who lived in a small mining camp in California during the gold rush days. Smiley was the most peculiar man you ever did see when it came to betting. He would bet on absolutely anything. If there was a horse race, he would bet on it. If there was a cat fight, he would bet on it. If there were two birds sitting on a fence, he would want to bet you which one would fly away first. He once followed a bug all the way to the next town just to see where it was heading, and he would have bet on that too if he could have found anyone willing to take the other side.

But the thing Smiley was most proud of was his frog. He had caught this frog one day and spent three solid months training it to jump. He named the frog Daniel Webster, and he claimed it was the finest jumping frog in all of Calaveras County. And by all accounts, it truly was. That frog could cover more ground in a single leap than any frog anyone had ever seen.

One day a stranger came to the mining camp, and Smiley immediately saw an opportunity. He bet the stranger forty dollars that Daniel Webster could outjump any frog in the county. The stranger said he did not have a frog, so Smiley went off to catch one for him. While Smiley was gone, the stranger had an idea. He picked up Daniel Webster and carefully filled the frog with quail shot until the creature was as heavy as a small brick. When the contest began, the stranger's frog hopped away easily while poor Daniel Webster could not budge an inch. He just sat there like a lump. Smiley was confused and defeated, and the stranger walked off with his forty dollars, whistling a happy tune.`,
    questions: [
      {
        question: 'What was Jim Smiley most known for?',
        options: ['His gold mining success', 'His willingness to bet on anything', 'His frog collection', 'His cooking skills'],
        correct: 1,
        explanation: 'Smiley was known as someone who would bet on absolutely anything, from horse races to which bird would fly first.'
      },
      {
        question: 'How did the stranger win the frog-jumping contest?',
        options: ['He had a specially trained frog', 'He distracted Daniel Webster', 'He filled Daniel Webster with quail shot to weigh him down', 'He bribed the judges'],
        correct: 2,
        explanation: 'While Smiley was away catching a frog for the stranger, the stranger filled Daniel Webster with quail shot, making the frog too heavy to jump.'
      },
      {
        question: 'What was the name of Smiley\'s frog?',
        options: ['Benjamin Franklin', 'Daniel Webster', 'Andrew Jackson', 'Thomas Jefferson'],
        correct: 1,
        explanation: 'Smiley named his prized jumping frog Daniel Webster.'
      }
    ]
  },
  {
    id: 'london-fire',
    title: 'Building a Fire in the Wild',
    author: 'Jack London',
    genre: 'Fiction',
    difficulty: 'easy',
    length: 'medium',
    content: `The man turned aside from the main trail and climbed the bank where a small stand of spruce trees offered shelter from the wind. The temperature had dropped to fifty degrees below zero, and each breath he drew came in with a sharp sting and left as a cloud of frozen vapor. His dog, a large native husky, pressed close to the ground and whimpered softly, its instincts sensing the danger that the man's intellect chose to ignore.

He stamped his feet and swung his arms, trying to force warmth back into his extremities. His fingers were numb inside his mittens, and his cheeks and nose had gone white with the first signs of frostbite. He needed fire, and he needed it quickly.

Under the spruce trees, he found dry twigs and grass. He reached into his pocket for his matches, but his fingers were so stiff that the small wooden sticks kept slipping from his grasp. After several fumbling attempts, he managed to grip one firmly enough to strike it against the box. The tiny flame caught, and he carefully held it to the bundle of grass and twigs he had arranged. The fire grew slowly at first, then with increasing confidence as larger sticks caught the flame.

He fed the fire carefully, adding bigger pieces of wood as it grew strong enough to accept them. Within a few minutes, a proper blaze crackled before him, and he could feel its warmth pushing back against the terrible cold. He held his hands close to the flames and slowly, painfully, the feeling began to return to his fingers. The dog moved closer to the fire as well, stretching out on the warm ground with a sigh of contentment.

But the man had made a crucial error. He had built his fire directly beneath the branches of a large spruce tree. The heat from the flames rose into the branches above, and the snow that had accumulated there throughout the long winter began to shift. It started as a small dusting of white powder falling through the branches, barely noticeable. Then a larger clump fell, landing at the edge of the fire with a soft hiss. The man looked up just as the entire load of snow released from the upper branches in a single cascading sheet. It fell directly onto the fire, smothering it completely in an instant.

The man stared at the spot where his fire had been, now nothing but a pile of wet snow and blackened sticks. The cold pressed in immediately, as if it had been waiting just beyond the circle of warmth for exactly this moment. He would have to build another fire, but his fingers were already growing numb again, and this time the task would be far more difficult.`,
    questions: [
      {
        question: 'Why did the man need to build a fire?',
        options: ['To cook food', 'To signal for rescue', 'To warm himself in extreme cold', 'To scare away wild animals'],
        correct: 2,
        explanation: 'The temperature was fifty below zero and the man was showing signs of frostbite, making fire essential for survival.'
      },
      {
        question: 'What mistake did the man make when building his fire?',
        options: ['He used wet wood', 'He built it beneath a snow-laden spruce tree', 'He forgot to bring matches', 'He built it too small'],
        correct: 1,
        explanation: 'He built the fire directly under a spruce tree. The heat melted the snow on the branches, which fell and smothered the fire.'
      },
      {
        question: 'How did the dog behave differently from the man?',
        options: ['The dog ran away from the cold', 'The dog sensed the danger instinctively while the man ignored it', 'The dog attacked the man', 'The dog refused to stop walking'],
        correct: 1,
        explanation: 'The dog\'s instincts sensed the danger of the extreme cold, while the man\'s intellect chose to ignore the warning signs.'
      },
      {
        question: 'What happened to the fire?',
        options: ['It burned out naturally', 'The wind blew it out', 'Snow fell from the tree and smothered it', 'The dog knocked it over'],
        correct: 2,
        explanation: 'The heat from the fire melted snow in the branches above, causing the accumulated snow to cascade down and completely smother the flames.'
      }
    ]
  },
  {
    id: 'doyle-observation',
    title: 'The Science of Observation',
    author: 'Arthur Conan Doyle',
    genre: 'Fiction',
    difficulty: 'easy',
    length: 'medium',
    content: `Watson entered the sitting room at Baker Street to find Holmes seated in his armchair, examining a battered felt hat with the most intense concentration. The hat was old and worn, with several patches where the fabric had been carefully mended.

"I can see nothing remarkable about this hat," Watson said, turning it over in his hands. "It is simply an old hat, rather the worse for wear."

Holmes took the hat back with a slight smile. "On the contrary, Watson, this hat tells us a great deal about its owner. You see, but you do not observe. That is the distinction I am forever trying to impress upon you."

"Then tell me what you can deduce from this ordinary hat," Watson replied, settling into his chair with genuine curiosity.

"To begin with, the owner is a man of considerable intelligence," Holmes said, placing his fingertips together. "The hat is of a large size, and it is well established that a man with so large a brain must have something in it. He was also once fairly prosperous but has fallen upon harder times recently."

"How can you possibly know that?"

"The hat is of excellent quality, made by an expensive manufacturer three years ago, as shown by the style and the maker's stamp inside the brim. Yet it has not been replaced despite considerable wear, and the attempts at mending show that the owner cannot currently afford a new one. Furthermore, the man's wife has ceased to love him."

Watson stared at his friend. "Surely you are joking."

"Not at all. Observe the hat lining. When this hat was new, it was regularly brushed and cared for. The dust upon it now is thick and accumulated over weeks. A man whose wife still attended to his appearance would not leave the house with so neglected a hat. Additionally, there are several tallow stains on the felt, suggesting the owner uses candles rather than gas lamps, which further confirms his reduced circumstances."

Watson shook his head in amazement. "When you explain it, the reasoning seems absurdly simple."

"It always does," Holmes replied. "The world is full of obvious things which nobody ever observes. The art of detection is simply the art of noticing what is before you and drawing the correct conclusions from what you see. Anyone could do it with sufficient practice and attention."`,
    questions: [
      {
        question: 'What distinction did Holmes draw between himself and Watson?',
        options: ['Holmes was smarter than Watson', 'Watson could see but did not observe', 'Holmes had better eyesight', 'Watson was not interested in details'],
        correct: 1,
        explanation: 'Holmes told Watson "You see, but you do not observe," meaning Watson looked at things without analyzing what they revealed.'
      },
      {
        question: 'How did Holmes deduce the hat owner had fallen on hard times?',
        options: ['The hat was stolen', 'The hat was expensive but worn and mended rather than replaced', 'The hat had holes in it', 'Someone told Holmes about the owner'],
        correct: 1,
        explanation: 'The hat was made by an expensive manufacturer but was now heavily worn and patched, suggesting the owner could no longer afford a replacement.'
      },
      {
        question: 'What did Holmes say the tallow stains indicated?',
        options: ['The owner was a candle maker', 'The owner used candles instead of gas lamps, confirming reduced means', 'The owner ate messy food', 'The owner worked in a factory'],
        correct: 1,
        explanation: 'Tallow stains indicated the use of candles rather than gas lighting, which Holmes interpreted as further evidence of financial difficulty.'
      }
    ]
  },
  {
    id: 'original-elevator',
    title: 'The Elevator',
    author: 'Original',
    genre: 'Thriller',
    difficulty: 'easy',
    length: 'short',
    content: `The elevator stopped between floors eleven and twelve, and the lights went out. Claire pressed the emergency button, but nothing happened. She pressed it again. Nothing. The red emergency phone was dead too, its cord hanging loose inside the metal box like a severed artery.

She was not alone. The man in the gray coat had stepped in at the lobby, and he stood now in the opposite corner, breathing steadily. She could not see him in the dark, but she could smell his cologne, something sharp and chemical, like a hospital corridor.

"Power outage," he said. His voice was calm, almost bored. "Happens in these old buildings."

Claire said nothing. She pressed her back against the wall and felt the cold metal through her blouse. Her phone had no signal. Of course it didn't. They were buried inside a concrete shaft.

"I'm David," the man said.

She didn't answer. She was listening to something else. Beneath the silence, beneath the faint hum of the stalled machinery above them, there was a sound. Rhythmic. Metallic. Like someone tapping a wrench against a pipe, far below.

"Do you hear that?" she whispered.

David was quiet for a long moment. "No," he said. But his breathing had changed.

The tapping grew louder. It was rising through the shaft toward them, floor by floor, and it was not random. It had a pattern. Three slow taps, then two fast ones. A pause. Then again.

The emergency lights flickered on, bathing them both in red. David's face was pale, and he was no longer standing in the corner. He was pressed against the doors, his fingers wedged into the crack between them, trying to pry them apart.

The tapping stopped directly beneath their feet.

Then something tapped back from inside the elevator wall.`,
    questions: [
      {
        question: 'What was wrong with the emergency phone?',
        options: ['It was locked', 'Its cord was hanging loose and it was dead', 'Someone had stolen it', 'It only worked during business hours'],
        correct: 1,
        explanation: 'The emergency phone was dead, with its cord hanging loose inside the metal box.'
      },
      {
        question: 'How did David react when Claire asked if he heard the tapping?',
        options: ['He immediately panicked', 'He said no, but his breathing changed', 'He laughed it off', 'He called for help'],
        correct: 1,
        explanation: 'David claimed not to hear it, but his changed breathing revealed that he did.'
      },
      {
        question: 'What pattern did the tapping follow?',
        options: ['Completely random', 'Three slow taps, two fast, then a pause', 'One tap per second', 'Five quick taps repeated'],
        correct: 1,
        explanation: 'The tapping followed a deliberate pattern: three slow taps, then two fast ones, then a pause before repeating.'
      }
    ]
  },
  {
    id: 'original-octopus',
    title: 'The Octopus Problem',
    author: 'Original',
    genre: 'Science',
    difficulty: 'easy',
    length: 'short',
    content: `An octopus named Inky once escaped from the National Aquarium of New Zealand by climbing out of his tank, sliding across the floor in the middle of the night, and squeezing his entire body through a narrow drainpipe that led to the ocean. The staff found nothing the next morning except a trail of water leading from the tank to the drain. Inky was never seen again.

This story is remarkable, but it is not unusual. Octopuses routinely escape from aquariums around the world, and they do it in ways that suggest something unsettling: they plan. They observe. They wait for the right moment.

At the Seattle Aquarium, an octopus learned to open childproof pill bottles to reach food inside. At a research lab in Italy, octopuses unscrewed jars from the inside after watching humans do it once. In another facility, an octopus figured out how to short-circuit the lights above its tank by squirting jets of water at the electrical fixture. It did this repeatedly, apparently because it preferred the dark.

What makes this so puzzling to scientists is that octopuses should not be this intelligent. They are invertebrates, closer on the evolutionary tree to clams and snails than to any animal we typically associate with cleverness. Their brains are structured nothing like ours. Two-thirds of their neurons are in their arms, not their heads, which means their arms can taste, touch, and make decisions semi-independently from the central brain.

They have no culture, no social learning, no parental guidance. An octopus never meets its parents. Most species die shortly after mating. Every octopus that has ever solved a puzzle or escaped a tank did so having invented intelligence entirely from scratch, alone, in a life that rarely lasts more than two years.

That is the octopus problem. Not how they think, but why something so brief and solitary bothers to think at all.`,
    questions: [
      {
        question: 'How did Inky escape the aquarium?',
        options: ['He broke the glass', 'He climbed out, crossed the floor, and squeezed through a drainpipe', 'A staff member accidentally released him', 'He escaped during a tank cleaning'],
        correct: 1,
        explanation: 'Inky climbed out of his tank, slid across the floor at night, and squeezed through a drainpipe to the ocean.'
      },
      {
        question: 'Why did the octopus short-circuit the lights above its tank?',
        options: ['It was an accident', 'It was trying to escape', 'It apparently preferred the dark', 'It was trying to attract prey'],
        correct: 2,
        explanation: 'The octopus repeatedly squirted water at the electrical fixture, apparently because it preferred the dark.'
      },
      {
        question: 'What is the "octopus problem" described in the passage?',
        options: ['Octopuses are going extinct', 'Scientists cannot figure out how to contain them', 'It is unclear why such brief, solitary creatures evolved intelligence at all', 'Their arms make independent decisions'],
        correct: 2,
        explanation: 'The "octopus problem" is the mystery of why an animal with such a short, solitary life would evolve the capacity for complex thought.'
      }
    ]
  },
  {
    id: 'original-cartographer',
    title: 'The Midnight Cartographer',
    author: 'Original',
    genre: 'Literary Fiction',
    difficulty: 'medium',
    length: 'medium',
    content: `Vera drew maps of places that did not exist.

She had started years ago, during the insomnia that followed her divorce, sitting at the kitchen table at two in the morning with a fine-tipped pen and sheets of cream-colored paper. The first map was an accident. She had been doodling coastlines, and the coastlines had become a bay, and the bay had needed a harbor, and the harbor had needed a town, and by dawn she had drawn a complete island with elevation lines, three rivers, a capital city called Meridia, and a mountain range she named the Voss Peaks after her grandmother.

She could not explain why this calmed her when nothing else would. Not the pills, not the walks, not the terrible late-night television. Something about inventing geography soothed the part of her brain that would otherwise replay every argument, every silence, every morning she had woken up next to someone who had already stopped loving her.

By the third month, she had mapped an entire continent. It had a temperate north with dense forests and long winters, a tropical south with river deltas and mangrove swamps, a central desert bisected by a single ancient road. She gave it nations with histories. She gave it trade routes and disputed borders and a mountain pass where two civilizations had fought a war over salt.

Her sister found the maps one afternoon and went quiet in a way that meant she was worried.

"These are beautiful," her sister said carefully, "but Vera, this is a lot of maps."

Vera looked at the walls of her spare bedroom, which were now covered floor to ceiling with hand-drawn cartography. She had charted ocean currents. She had drawn dialect maps showing how the imaginary languages shifted across her invented regions. She had mapped the migration patterns of birds that did not exist across skies that had never held clouds.

"I know," Vera said.

"Are you okay?"

Vera considered this honestly. She was sleeping better. She ate regular meals now. She had stopped checking her ex-husband's social media. Last week she had laughed at something a stranger said in the grocery store, and the sound of her own laughter had startled her because she had forgotten it.

"I think so," she said. "I think I needed to build something. And I didn't trust myself to build anything real."

Her sister looked at the map nearest to her, a detailed rendering of a coastal city with tiny labeled streets and a lighthouse at the end of a breakwater. "This is real enough," she said quietly.

And Vera, for the first time in a long time, believed her.`,
    questions: [
      {
        question: 'What originally triggered Vera to begin drawing maps?',
        options: ['She was a professional cartographer', 'Insomnia following her divorce', 'A school assignment', 'A trip she was planning'],
        correct: 1,
        explanation: 'Vera started drawing maps during the insomnia that followed her divorce, sitting at her kitchen table at two in the morning.'
      },
      {
        question: 'What was Vera\'s sister\'s reaction when she found the maps?',
        options: ['She was excited and wanted to help', 'She was angry and tore them down', 'She said they were beautiful but was clearly worried', 'She did not notice them'],
        correct: 2,
        explanation: 'Her sister said the maps were beautiful but went quiet in a way that meant she was worried about Vera.'
      },
      {
        question: 'Why did Vera say she drew imaginary places instead of building something real?',
        options: ['Real places were copyrighted', 'She did not trust herself to build anything real', 'She preferred fantasy over reality', 'She was training for a job'],
        correct: 1,
        explanation: 'Vera said she needed to build something but did not trust herself to build anything real, suggesting fragility and a need for safe creative expression.'
      },
      {
        question: 'What signs suggest Vera was actually recovering?',
        options: ['She got a new job', 'She started dating again', 'She was sleeping better, eating regularly, and had laughed spontaneously', 'She moved to a new city'],
        correct: 2,
        explanation: 'Vera was sleeping better, eating regular meals, had stopped checking her ex-husband\'s social media, and had laughed spontaneously at a stranger\'s comment.'
      }
    ]
  },
  {
    id: 'original-memory-auction',
    title: 'The Memory Auction',
    author: 'Original',
    genre: 'Science Fiction',
    difficulty: 'medium',
    length: 'medium',
    content: `The auction house on Bleecker Street looked like any other from the outside, but the merchandise was unusual. They sold memories.

The technology had been available for about three years. A company called Mnemos had developed a neural interface that could extract a specific memory from one person's brain and implant it in another's. The transfer was permanent in both directions: the seller forgot, and the buyer remembered, as vividly and completely as if the experience had been their own.

At first, people sold their trauma. Survivors of accidents, veterans haunted by combat, anyone carrying something they could not put down. Mnemos marketed it as therapy. Erase your worst day. Start fresh. The buyers were researchers, mostly, or artists looking for authentic material.

But then the market shifted. People discovered that happy memories were worth far more.

Lot 47 on this particular Tuesday evening was a first kiss, offered by an eighty-two-year-old woman named Dolores who needed the money for her granddaughter's medical bills. The auctioneer described it with clinical precision: summer of 1961, a lake in Vermont, a boy named Thomas, the smell of pine needles and sunscreen. Dolores sat in the front row, hands folded in her lap, watching strangers bid on the single brightest moment of her life.

It sold for fourteen thousand dollars to a young man in an expensive suit who had never been in love and was tired of waiting.

Dolores signed the paperwork with a steady hand. She sat in the extraction chair and closed her eyes. The technician placed the neural crown on her head and asked if she was ready. She nodded.

When it was over, Dolores blinked and looked around the room with a mild, pleasant confusion. She recognized nothing about the place. She did not remember why she had come. An attendant helped her to her feet and walked her to the door, where her granddaughter was waiting.

"How do you feel, Grandma?"

Dolores smiled. "Fine, dear. A little foggy. Was I here for a doctor's appointment?"

Across the room, the young man in the suit was sitting perfectly still in the implant chair. A tear rolled down his cheek. He could smell pine needles. He could feel the sun on his shoulders and the nervous electricity of standing close to someone for the first time. He remembered a boy named Thomas, and a lake, and the terrifying, perfect moment before a kiss.

He remembered it like it was his. Because now it was.`,
    questions: [
      {
        question: 'What happens to the seller after a memory transfer?',
        options: ['They keep a faded version of the memory', 'They permanently forget the memory', 'They gain a copy of the buyer\'s memories', 'They temporarily lose the memory but it returns'],
        correct: 1,
        explanation: 'The transfer was permanent: the seller forgot completely, and the buyer remembered the experience as if it had been their own.'
      },
      {
        question: 'Why did Dolores sell her memory?',
        options: ['She wanted to forget a painful experience', 'She needed money for her granddaughter\'s medical bills', 'She was participating in a research study', 'She no longer valued the memory'],
        correct: 1,
        explanation: 'Dolores needed the money for her granddaughter\'s medical bills, which is why she sold her most treasured memory.'
      },
      {
        question: 'How did the memory market shift over time?',
        options: ['It became illegal', 'People stopped selling memories', 'Happy memories became worth far more than traumatic ones', 'Prices dropped as supply increased'],
        correct: 2,
        explanation: 'Initially people sold traumatic memories as a form of therapy, but the market shifted when buyers realized happy memories were worth far more.'
      },
      {
        question: 'What detail reveals the emotional weight of the transfer for the buyer?',
        options: ['He demanded a refund', 'He fell asleep immediately', 'A tear rolled down his cheek as he experienced the memory', 'He asked for more memories from Dolores'],
        correct: 2,
        explanation: 'The young man sat still with a tear on his cheek, experiencing the full sensory and emotional reality of Dolores\'s first kiss as if it were his own.'
      }
    ]
  },
  {
    id: 'original-deep-time',
    title: 'Deep Time',
    author: 'Original',
    genre: 'Science',
    difficulty: 'hard',
    length: 'medium',
    content: `The human mind did not evolve to comprehend deep time. We are creatures of seasons and generations, built to think in terms of years, perhaps centuries if we strain. But the history of the Earth operates on a timescale so vast that it renders our entire civilization a rounding error, an afterthought appended to the final sentence of a book that has been writing itself for four and a half billion years.

Consider this exercise, adapted from John McPhee. Stretch your arms wide, so that the full span from fingertip to fingertip represents the entire age of the Earth. On this scale, all of recorded human history, every empire, every war, every poem, every person you have ever heard of, occupies a distance thinner than the shaving removed by a single stroke of a nail file across the tip of your middle finger.

The Cambrian Explosion, that frenzy of evolutionary innovation when most major animal body plans first appeared, occurred roughly at your wrist. The dinosaurs ruled from the middle of your right palm to somewhere around your last knuckle. They were the dominant land animals for a hundred and sixty-five million years, a span of time so immense that a Tyrannosaurus Rex lived closer in time to you reading this sentence than it did to a Stegosaurus. The two great dinosaurs missed each other by eighty million years.

These numbers defeat intuition. Eighty million years is not a quantity the human brain can feel. We can write it, calculate with it, speak the words, but we cannot experience it the way we experience the difference between a minute and an hour. The philosopher Blaise Pascal once wrote that the eternal silence of infinite space frightened him. Deep time is a different kind of vertigo. It is not the vastness above us but the vastness behind us, the knowledge that the universe was here long before consciousness arrived to notice it, and that it will persist, with absolute indifference, long after consciousness departs.

There is something both humbling and liberating in this recognition. Humbling because it reveals the true proportions of our existence. Liberating because, if all of human effort is a shaving from a fingernail, then the anxieties that consume our days are smaller still. The Earth does not care about your mortgage. The geological column has no opinion about your career. The trilobites that once owned this planet are now impressions in shale, and they thrived for three hundred million years. We have been here for roughly three hundred thousand.

The mathematician Bertrand Russell suggested that the contemplation of vast things has the power to enlarge the mind. If that is true, then deep time is the vastest classroom available to us, and its lesson is not despair but proportion.`,
    questions: [
      {
        question: 'In the arm-span analogy, what does all of recorded human history correspond to?',
        options: ['The length of one hand', 'The distance from elbow to wrist', 'A shaving from a single nail file stroke', 'The width of one finger'],
        correct: 2,
        explanation: 'All of recorded human history occupies a distance thinner than the shaving removed by a single stroke of a nail file across the tip of the middle finger.'
      },
      {
        question: 'What surprising fact is stated about T. Rex and Stegosaurus?',
        options: ['They lived in the same period', 'T. Rex evolved from Stegosaurus', 'T. Rex lived closer in time to modern humans than to Stegosaurus', 'Stegosaurus was larger than T. Rex'],
        correct: 2,
        explanation: 'A T. Rex lived closer in time to a person reading today than it did to a Stegosaurus, as the two dinosaurs were separated by eighty million years.'
      },
      {
        question: 'What does the author describe as the lesson of deep time?',
        options: ['Despair at human insignificance', 'Not despair but proportion', 'The need to act quickly before time runs out', 'That human civilization will last forever'],
        correct: 1,
        explanation: 'The author concludes that deep time\'s lesson is "not despair but proportion," suggesting it should give us perspective rather than hopelessness.'
      },
      {
        question: 'How long did trilobites thrive compared to humans?',
        options: ['About the same length of time', 'Trilobites for 300 million years versus humans for about 300 thousand', 'Humans have existed longer', 'Trilobites only lasted a few million years'],
        correct: 1,
        explanation: 'Trilobites thrived for three hundred million years, while humans have been here for roughly three hundred thousand years, a factor of a thousand difference.'
      }
    ]
  },
  {
    id: 'original-beekeeper',
    title: 'The Last Beekeeper of Gascony',
    author: 'Original',
    genre: 'Literary Fiction',
    difficulty: 'medium',
    length: 'medium',
    content: `Marcel Dutoit kept forty-seven hives on a hillside above the Garonne River, in a part of southern France where the lavender still grew wild and the summers still smelled the way summers are supposed to smell. He was seventy-one years old, and he had been keeping bees since he was nine, when his grandfather placed a frame of honeycomb in his small hands and told him to hold still and listen.

He had been listening ever since. He could hear the difference between a contented hive and an anxious one. He knew by the pitch of the hum whether the queen was present, whether the colony was preparing to swarm, whether something was wrong in a way that could not yet be seen. His neighbors thought this was superstition. His bees thought it was perfectly reasonable.

But something had been wrong for several years now, and listening was no longer enough to fix it. The colonies were shrinking. Each spring he opened the hives expecting recovery and instead found silence. Bees that should have survived the winter lay in small heaps at the bottom of the frames, their bodies curled inward as if they had died trying to hold onto something. The ones that remained flew shorter distances and returned confused, circling the hive entrance as though they had forgotten where they lived.

Marcel had read about colony collapse disorder. He understood the explanations: pesticides, parasites, monoculture, habitat loss. He could recite the statistics. What he could not do was reconcile the science with the experience of standing in his apiary on a June morning and feeling, in his bones, that the world had shifted in some fundamental way that the bees had noticed before anyone else.

His daughter, who lived in Toulouse and worked in marketing, suggested he retire. She said it gently, the way you say difficult things to people you love. The bees are dying, Papa. You cannot stop it alone. Come live near us. The grandchildren miss you.

Marcel understood her logic. It was impeccable. It was also beside the point.

He did not keep bees because it was practical or profitable. He kept bees because when he stood among them in the early light, with the hum surrounding him like a living cathedral, he felt connected to something older and more intelligent than himself. The bees had been pollinating the flowers of this valley since before the Romans built their roads through it. They had survived ice ages and plagues and revolutions. The idea that they would not survive the twenty-first century struck him as so grotesque that to accept it felt like a kind of treason.

So each morning he put on his veil and lit his smoker and walked up the hill. He inspected the frames. He noted what he saw. He did what he could. He listened.

It was, he knew, probably not enough. He did it anyway.`,
    questions: [
      {
        question: 'How did Marcel know when something was wrong with a hive?',
        options: ['He used electronic monitoring equipment', 'He could hear differences in the pitch and sound of the hive', 'He counted the bees each morning', 'His grandfather\'s written guides told him'],
        correct: 1,
        explanation: 'Marcel could hear the difference between a contented hive and an anxious one, and could tell by the pitch of the hum whether the queen was present or if something was wrong.'
      },
      {
        question: 'What did Marcel\'s daughter suggest he do?',
        options: ['Expand his operation', 'Move to Toulouse and retire near the family', 'Switch to a different type of farming', 'Contact environmental organizations'],
        correct: 1,
        explanation: 'His daughter gently suggested he retire and come live near them in Toulouse, where the grandchildren missed him.'
      },
      {
        question: 'Why did Marcel continue keeping bees despite the declining colonies?',
        options: ['He needed the income', 'He felt connected to something older and more intelligent than himself', 'He believed he had found a cure for colony collapse', 'He was contractually obligated'],
        correct: 1,
        explanation: 'Marcel kept bees because standing among them made him feel connected to something ancient and greater than himself, not for practical or profitable reasons.'
      },
      {
        question: 'What does Marcel feel the bees noticed before humans?',
        options: ['A change in weather patterns', 'A fundamental shift in the world itself', 'The arrival of new predators', 'The construction of nearby buildings'],
        correct: 1,
        explanation: 'Marcel felt that the world had shifted in some fundamental way and that the bees had noticed it before anyone else did.'
      }
    ]
  },
  {
    id: 'original-dolphins',
    title: 'What Dolphins Talk About',
    author: 'Original',
    genre: 'Science',
    difficulty: 'easy',
    length: 'medium',
    content: `In 2016, two bottlenose dolphins at the Karadag Nature Reserve in Ukraine did something that stunned researchers. During a recorded session, one dolphin, named Yasha, produced a series of clicks and pulses, then paused and waited. The second dolphin, named Yana, listened to the entire sequence without interrupting, then responded with her own series. They took turns. They did not talk over each other. To the researchers, it looked unmistakably like a conversation.

This was not entirely new. Scientists had known for decades that dolphins produce complex vocalizations. They use clicks for echolocation, finding fish and navigating murky water by reading the echoes. But they also produce whistles and burst-pulse sounds that serve a different purpose entirely: communication.

Each dolphin develops a unique whistle within the first few months of life, a kind of acoustic name. They use these signature whistles to identify themselves to others, and, remarkably, they also use the signature whistles of other dolphins to call them by name. If a dolphin is separated from a companion, it will broadcast that companion's whistle, essentially calling out for them across the water.

But the conversation between Yasha and Yana suggested something beyond naming. The researchers found that each dolphin produced sentences of up to five pulses, and that no two sentences in the exchange were the same. This implied that the dolphins were not just signaling but were exchanging novel information, saying things to each other that had not been said before.

The difficulty is translation. Dolphin communication operates across frequencies and speeds that the human ear cannot fully process without technological help. A single click can contain layers of information compressed into a fraction of a second. We can record these sounds. We can analyze their structure. What we cannot yet do is understand what they mean.

It is possible that dolphins discuss food, danger, family, and territory. It is possible they gossip. It is possible they discuss things we have no framework to imagine. For now, we are in the position of someone overhearing an animated conversation in a language they have never encountered, able to tell that something meaningful is being said but unable to grasp a single word.`,
    questions: [
      {
        question: 'What was remarkable about the exchange between Yasha and Yana?',
        options: ['They used identical sounds', 'They took turns without interrupting, like a conversation', 'They communicated with humans', 'They used echolocation to find each other'],
        correct: 1,
        explanation: 'The dolphins took turns producing sequences of sounds without talking over each other, which looked unmistakably like a conversation to researchers.'
      },
      {
        question: 'What is a "signature whistle"?',
        options: ['A warning call for predators', 'A unique whistle each dolphin develops as an acoustic name', 'A sound used for echolocation', 'A mating call'],
        correct: 1,
        explanation: 'Each dolphin develops a unique signature whistle in the first months of life, used to identify themselves and to call other dolphins by name.'
      },
      {
        question: 'Why is translating dolphin communication so difficult?',
        options: ['Dolphins refuse to communicate in captivity', 'Their sounds operate across frequencies and speeds humans cannot fully process without technology', 'They only communicate underwater', 'Their vocabulary is too small to analyze'],
        correct: 1,
        explanation: 'Dolphin sounds contain layered information compressed into fractions of seconds across frequencies the human ear cannot fully process without technological help.'
      }
    ]
  },
  {
    id: 'original-forgery',
    title: 'The Forger\'s Dilemma',
    author: 'Original',
    genre: 'Historical Fiction',
    difficulty: 'medium',
    length: 'long',
    content: `The painting was finished, and it was perfect. Han van der Berg stood back from his easel in the cold attic studio and studied the canvas with the pitiless eye of a man who had spent eleven years learning to be someone else.

The work depicted a supper scene in the style of Johannes Vermeer: a woman pouring milk by a window, light falling across her face in that impossible way Vermeer had mastered, each photon seemingly accounted for, each shadow earning its place. The pigments were correct. Han had ground them himself from lapis lazuli and lead white purchased through a dealer in Amsterdam who did not ask questions. The canvas was a seventeenth-century landscape he had bought at a flea market and carefully scraped clean, preserving the original stretcher bars and tack holes. The craquelure, those tiny cracks that appear in old paint over centuries, had been induced by baking the finished work in a low oven and rolling it gently over a cylinder. Even the varnish was mixed from a period-appropriate recipe he had found in a conservation manual.

He had been a legitimate painter once. He had studied at the Royal Academy, had exhibited in small galleries, had received the kind of reviews that use words like "promising" and "derivative" in the same sentence. The critics had looked at his original work and seen competence without genius, skill without vision. They were not wrong. Han knew his own limitations better than anyone. He was a superb technician and a mediocre artist, and the distance between those two things was the distance between a craftsman and a creator.

The forgery changed everything. If he could not make the world see beauty in a painting signed Han van der Berg, he would make them see it in a painting they believed was signed by Vermeer. The same brushwork they had dismissed as imitative in his originals, they would celebrate as masterful in a supposed Old Master. The joke was exquisite, and it was entirely on them.

His dealer, a nervous man named Pieter, had already found a buyer. A private collector in Switzerland, someone with more money than expertise, the ideal client. The sale would bring two hundred thousand euros, more than Han had earned in his entire career as an honest painter.

But something was wrong tonight. Han stood in front of the finished work and felt an unfamiliar sensation, one that had no place in the clean logic of a con. He felt grief.

The painting was beautiful. Not because it looked like a Vermeer, but because Han had poured genuine feeling into it, had spent months living inside the light and silence of this imaginary room, had come to care about the woman pouring milk as though she were real. He had painted her with love, and the result was the finest work of his life.

No one would ever know. That was the whole point. The painting's power depended on the viewer believing it was the work of a man who had been dead for three hundred years. If Han revealed himself as the painter, the same critics who would have praised the Vermeer would dismiss the van der Berg. The beauty would not change. Not a single brushstroke would be different. But the name on the wall would alter everything.

He wrapped the canvas in linen and placed it in the wooden crate Pieter had sent over. He sealed it with brown tape. He wrote the shipping address in neat block letters.

Then he sat down at his table, poured a glass of wine, and stared at the empty easel for a very long time.

He had proven his point. The art world was a fraud. Talent was invisible without a famous name. He was right about all of it.

It did not make him feel better.`,
    questions: [
      {
        question: 'Why did Han turn to forgery?',
        options: ['He had always been a criminal', 'He wanted to prove that critics valued famous names over actual artistry', 'He could not afford painting supplies', 'A dealer recruited him against his will'],
        correct: 1,
        explanation: 'Han turned to forgery because critics dismissed his original work as "derivative" while the same techniques would be celebrated if attributed to Vermeer, exposing the art world\'s reliance on reputation over quality.'
      },
      {
        question: 'How did Han create convincing craquelure on the painting?',
        options: ['He used a chemical spray', 'He baked the painting in a low oven and rolled it over a cylinder', 'He let it age naturally for years', 'He scratched the surface with a fine needle'],
        correct: 1,
        explanation: 'Han induced the tiny cracks typical of old paintings by baking the finished work in a low oven and gently rolling it over a cylinder.'
      },
      {
        question: 'What unexpected emotion did Han feel after finishing the painting?',
        options: ['Triumph and excitement', 'Grief', 'Fear of being caught', 'Indifference'],
        correct: 1,
        explanation: 'Han felt grief because the painting was the finest work of his life, made with genuine love, but no one would ever know it was his.'
      },
      {
        question: 'What is the central paradox of Han\'s situation?',
        options: ['He cannot paint well enough to fool experts', 'The painting is beautiful regardless of who made it, but only a famous name makes people see the beauty', 'He does not need the money but steals anyway', 'He prefers forgery to original work'],
        correct: 1,
        explanation: 'The paradox is that the beauty of the painting would not change if Han revealed himself as the painter, but the art world would dismiss it simply because of the name attached.'
      }
    ]
  },
  {
    id: 'original-mycelium',
    title: 'The Wood Wide Web',
    author: 'Original',
    genre: 'Science',
    difficulty: 'hard',
    length: 'long',
    content: `Beneath every forest floor exists a network so vast, so intricately connected, and so quietly essential that scientists have taken to calling it the Wood Wide Web. It is made of fungi, and it is arguably the most important infrastructure on land.

The network consists of mycorrhizal fungi, organisms that form symbiotic relationships with the roots of plants. The visible part of a fungus, the mushroom, is merely its reproductive structure, analogous to an apple on a tree. The real body of the fungus is the mycelium, a web of microscopically thin filaments called hyphae that spread through the soil in every direction. A single cubic centimeter of forest soil can contain eight kilometers of these filaments. A single fungal network can span an entire forest.

The relationship between the fungi and the trees is transactional but not simple. Trees photosynthesize, converting sunlight into carbon sugars, but their roots are relatively crude instruments for extracting minerals from the soil. Mycorrhizal fungi are the opposite: they cannot photosynthesize but are extraordinarily efficient at mining phosphorus, nitrogen, and micronutrients from rock and organic matter. The exchange is straightforward. The tree provides the fungus with sugars. The fungus provides the tree with minerals. Both benefit. Neither can thrive alone.

But the network does more than facilitate two-party trades. Because the mycelium connects the roots of many trees simultaneously, it functions as a distribution system. Resources can flow not just between a tree and its fungal partner, but between trees, using the fungal network as a conduit.

This is where the science becomes extraordinary. Research by the ecologist Suzanne Simard demonstrated that large, established trees, which she calls Mother Trees, actively send carbon and nutrients through the fungal network to smaller, younger trees growing in the shade below. They subsidize their offspring. They feed their neighbors. When a Mother Tree is dying, it dumps its remaining resources into the network in what can only be described as an act of arboreal generosity, a final bequest to the community that will survive it.

The network also carries information. When a tree is attacked by insects, it can send chemical alarm signals through the mycorrhizal web. Neighboring trees that receive these signals begin producing defensive compounds before the insects even reach them. The network functions, in effect, as an early warning system, an immune response distributed across hundreds of organisms connected by fungal thread.

Not all participants play fair. Some plants, known as mycoheterotrophs, have abandoned photosynthesis entirely and survive by parasitizing the fungal network, stealing carbon that other plants produced. Certain orchids do this. They contribute nothing to the system but take what they need, ghosts in the machine, sustained entirely by the labor of others.

The discovery of these networks has forced ecologists to reconsider some fundamental assumptions. The classical view of forests emphasized competition: trees fighting for light, water, and space in a Darwinian struggle. That picture is not wrong, but it is radically incomplete. Forests also cooperate. They share resources. They communicate. They behave, at the system level, less like a collection of individuals and more like a superorganism, a community bound together by fungal architecture that predates the evolution of roots themselves.

The mycorrhizal partnership is at least four hundred million years old. It likely enabled the colonization of land by plants in the first place, since the earliest terrestrial plants lacked true roots and depended on fungi to access soil nutrients. In a very real sense, the forests did not create the fungal networks. The fungal networks created the forests.

And they are still running, right now, beneath your feet, in every park, every garden, every patch of woodland. Silent, invisible, and essential. Moving sugar and phosphorus and whispered chemical warnings through the dark, holding the world together from below.`,
    questions: [
      {
        question: 'What is the basic exchange between mycorrhizal fungi and trees?',
        options: ['Trees provide water and fungi provide light', 'Trees provide carbon sugars and fungi provide soil minerals', 'Both organisms compete for the same nutrients', 'Fungi consume dead trees for energy'],
        correct: 1,
        explanation: 'Trees provide fungi with carbon sugars from photosynthesis, while fungi provide trees with phosphorus, nitrogen, and micronutrients they mine from the soil.'
      },
      {
        question: 'What did Suzanne Simard discover about "Mother Trees"?',
        options: ['They are the oldest trees in a forest', 'They actively send carbon and nutrients through the fungal network to younger trees', 'They produce the most seeds', 'They are resistant to all diseases'],
        correct: 1,
        explanation: 'Simard found that large established trees send carbon and nutrients through the fungal network to smaller, younger trees, effectively subsidizing and feeding their neighbors and offspring.'
      },
      {
        question: 'What are mycoheterotrophs?',
        options: ['Fungi that help trees communicate', 'Plants that parasitize the fungal network without contributing', 'Trees that produce extra carbon for the network', 'Insects that attack the mycelium'],
        correct: 1,
        explanation: 'Mycoheterotrophs are plants that have abandoned photosynthesis and survive by stealing carbon from the fungal network without contributing anything in return.'
      },
      {
        question: 'What does the author argue about the relationship between fungi and forests?',
        options: ['Forests created the fungal networks millions of years ago', 'The fungal networks likely enabled forests to exist in the first place', 'Forests can survive without fungal networks', 'Fungi are slowly destroying the forests'],
        correct: 1,
        explanation: 'The author argues that the earliest land plants depended on fungi to access nutrients, meaning the fungal networks created the conditions that made forests possible, not the other way around.'
      }
    ]
  },
  {
    id: 'original-lighthouse',
    title: 'The Keeper of North Point Light',
    author: 'Original',
    genre: 'Psychological Fiction',
    difficulty: 'hard',
    length: 'long',
    content: `The lighthouse keeper had been alone for so long that he had begun holding conversations with the light itself. Not the lamp, which was merely a mechanism of brass and glass and whale oil, but the light, the beam that swept out from the tower across the black Atlantic every twelve seconds with the slow certainty of a metronome.

His name was Asa Greer, though he had not spoken it aloud in four months, not since the supply boat had last come. He was fifty-three years old and had kept the North Point Light for eleven years. Before that he had been a schoolteacher in Portland, married, with a daughter. Those facts felt increasingly like information about a different person, a character in a novel he had read once and half forgotten.

The isolation had come on gradually, the way a tide comes in, not as a wave but as a slow accumulation of inches. The first year he had kept a detailed journal. The second year the entries became shorter. By the fifth year he wrote only the weather and the condition of the lamp. By the eighth year he had stopped writing entirely. There was nothing to record. Each day was the previous day with a different arrangement of clouds.

What replaced the journal was the dialogue. It began as a kind of narration, Asa describing his own actions to himself as he performed them. I am climbing the stairs. I am trimming the wick. I am eating bread with salted butter. This was not alarming. Many solitary people talk to themselves. But over time the narration shifted. It became a conversation, and the other voice in the conversation was the light.

The light, Asa decided, had opinions. It disapproved of the way he let the brass fittings tarnish. It worried about the fishing boats that passed too close to the reef on foggy nights. It had a dry, patient humor and a tendency to repeat itself, which Asa attributed to the nature of its work. You try sweeping the same arc of ocean ten thousand times a night, the light said, and see if you do not become a little repetitive.

He knew this was not real. He was educated, rational, self-aware. He understood that the voice was a product of his own mind, a mechanism his brain had invented to keep itself from atrophying in the silence. Knowing this did not make the conversations less vivid, nor did it make them less necessary. The mind requires an interlocutor, someone or something to push back against, to question, to surprise it. Without that friction, thought itself begins to smooth and flatten, like a stone tumbled in a river until all its edges are gone.

The supply boat was late this quarter. It should have arrived two weeks ago. Asa was not yet worried about provisions; he had enough dried fish and hardtack to last another month. What concerned him was a different kind of hunger, the need to confirm that the world beyond the lighthouse still existed.

He climbed the tower at sunset as he always did, two hundred and seventeen steps that he could now navigate in absolute darkness. He cleaned the lens. He lit the lamp. The beam sprang outward, cutting through the dusk like a slow white blade, and began its rotation.

"Quiet tonight," Asa said.

The light said nothing for a full revolution. Then, as it swept past the window facing east, it said: They have not forgotten you.

"You don't know that."

I know the sea, the light said. The boats will come. They always come. That is what boats do.

Asa leaned against the glass and watched the beam paint its arc across the water. Somewhere out there, invisible in the dark, ships were using his light to navigate. They were adjusting their courses by his flame, trusting it, depending on it without ever meeting the man who kept it burning.

"And what if they don't come?" he asked.

Then you and I will continue this conversation, the light said. Which, between us, you need more than the supplies.

Asa laughed. It was a strange, rusty sound, out of practice and slightly too loud for the small room. But it was real, and it echoed off the glass, and for a moment the lighthouse felt less like a prison and more like what it was: a small, necessary fire in a very large darkness, kept by a man who had not yet stopped caring whether distant strangers made it safely home.`,
    questions: [
      {
        question: 'How did the keeper\'s isolation progress over the years?',
        options: ['It hit him suddenly after the first month', 'It came gradually, like a tide, with his journal entries shrinking year by year until he stopped writing', 'He adapted well and never felt isolated', 'He became isolated only when the supply boat stopped coming'],
        correct: 1,
        explanation: 'The isolation came gradually: his journal entries shortened each year until he stopped writing entirely by the eighth year, with each day becoming indistinguishable from the last.'
      },
      {
        question: 'How did Asa rationalize his conversations with the light?',
        options: ['He believed the light was genuinely alive', 'He thought he was channeling spirits', 'He understood it was his mind\'s mechanism to prevent atrophy in isolation', 'He never questioned the conversations'],
        correct: 2,
        explanation: 'Asa knew the voice was a product of his own mind, a mechanism his brain invented to keep itself from atrophying in the silence, though this knowledge did not make the conversations less vivid or necessary.'
      },
      {
        question: 'What was Asa more worried about than running out of food?',
        options: ['The lamp breaking down', 'Losing his ability to climb the stairs', 'Confirming that the world beyond the lighthouse still existed', 'Pirates approaching the lighthouse'],
        correct: 2,
        explanation: 'Though he had enough provisions for another month, Asa was concerned about a different hunger: the need to confirm that the outside world still existed.'
      },
      {
        question: 'What does the final paragraph suggest about Asa\'s state of mind?',
        options: ['He has given up hope completely', 'Despite isolation, he still cares about keeping strangers safe and finds purpose in that', 'He plans to abandon the lighthouse', 'He has lost all connection to reality'],
        correct: 1,
        explanation: 'The ending reveals that Asa still cares whether distant strangers make it safely home, and this purpose transforms the lighthouse from a prison into a meaningful post.'
      }
    ]
  },
  {
    id: 'original-sleep',
    title: 'Why We Dream',
    author: 'Original',
    genre: 'Science',
    difficulty: 'medium',
    length: 'long',
    content: `Every night, as you cross the threshold between waking and sleep, your brain undertakes a project of staggering complexity. It paralyzes your voluntary muscles so you do not act out your hallucinations. It shuts down your logical reasoning centers while amplifying the regions responsible for emotion, memory, and visual imagery. Then, in this carefully constructed state of controlled madness, it tells you stories.

You dream for approximately two hours every night, mostly during the phase of sleep called REM, named for the rapid eye movements that occur as your eyes track the scenes playing behind your closed lids. During REM sleep, your brain is nearly as active as it is when you are awake. Some regions are even more active. The amygdala, which processes emotion, lights up intensely, which is why dreams feel so urgent and vivid even when their content is absurd. You can fly through a city made of glass and feel genuine terror, or meet a stranger who is somehow also your mother and accept this as perfectly logical.

The question of why we dream has occupied scientists and philosophers for centuries, and the honest answer is that we still do not know for certain. But several compelling theories have emerged.

The most widely supported is the memory consolidation hypothesis. During REM sleep, the brain appears to replay and reorganize the experiences of the day, transferring important information from short-term to long-term memory and discarding what it deems irrelevant. Students who sleep after studying perform significantly better on tests than students who stay awake for the same interval. The brain, it seems, needs to go offline to properly file what it has learned.

A related theory, proposed by the neuroscientist Matthew Walker, suggests that dreams serve an emotional processing function. The brain revisits difficult or traumatic experiences during REM sleep but does so in a neurochemical environment stripped of norepinephrine, the stress chemical associated with the fight-or-flight response. In effect, you re-experience the emotional event without the stress hormones that accompanied it originally. This allows the memory to be gradually defused, to lose its sharp emotional charge. Walker has described dreaming as overnight therapy, a nightly process of emotional triage that helps us wake up feeling less burdened by the previous day.

A third theory is older and stranger. The psychiatrist Jungian analyst James Hillman argued that dreams are not functional processes at all. They are not the brain solving problems or filing memories. They are the psyche's own autonomous creative expression, a nightly art form produced for reasons that may have nothing to do with the waking mind's agenda. In this view, asking why we dream is like asking why we make music. The question assumes utility where there may be only expression.

What is not in dispute is that dreaming is essential. Deprive a person of REM sleep while allowing all other sleep stages and within days they will develop irritability, difficulty concentrating, and mild paranoia. Rats deprived of REM sleep die within weeks, though researchers are still debating exactly what kills them. The brain demands its nightly theater, and the consequences of canceling the performance are severe.

Perhaps the most remarkable thing about dreams is how quickly we forget them. Within five minutes of waking, roughly half of a dream's content is lost. Within ten minutes, ninety percent is gone. We spend years of our lives in this vivid, emotionally charged alternate reality, and we retain almost nothing of it. The brain produces these extraordinary nightly narratives and then, with ruthless efficiency, erases them.

What it keeps, presumably, is what matters: the reorganized memories, the defused emotions, the subtle recalibrations that allow us to face the next day slightly different from the person who fell asleep. The stories themselves are scaffolding, torn down each morning to reveal whatever structure was being built in the dark.`,
    questions: [
      {
        question: 'What does the brain do to the body during REM sleep to prevent acting out dreams?',
        options: ['Slows the heart rate', 'Paralyzes voluntary muscles', 'Lowers body temperature', 'Reduces blood flow to limbs'],
        correct: 1,
        explanation: 'The brain paralyzes voluntary muscles during REM sleep so the dreamer does not physically act out the hallucinations occurring in the dream.'
      },
      {
        question: 'How does Matthew Walker describe the emotional function of dreaming?',
        options: ['Dreams create new stressful memories', 'Dreams replay emotional events without stress hormones, acting as overnight therapy', 'Dreams suppress all emotions permanently', 'Dreams amplify positive emotions and eliminate negative ones'],
        correct: 1,
        explanation: 'Walker suggests dreams revisit difficult experiences in a neurochemical environment without norepinephrine, the stress chemical, effectively providing "overnight therapy" that defuses the emotional charge of memories.'
      },
      {
        question: 'What happens to dream content within ten minutes of waking?',
        options: ['It becomes clearer and more detailed', 'About fifty percent is lost', 'Ninety percent is gone', 'It is fully retained if the dream was emotional'],
        correct: 2,
        explanation: 'Within ten minutes of waking, roughly ninety percent of a dream\'s content is lost, despite the vivid and emotionally charged nature of the experience.'
      },
      {
        question: 'How did James Hillman\'s view of dreams differ from the other theories?',
        options: ['He believed dreams were meaningless noise', 'He saw dreams as autonomous creative expression rather than functional brain processes', 'He thought dreams only occurred in children', 'He argued dreams were caused by external stimuli'],
        correct: 1,
        explanation: 'Hillman argued dreams were the psyche\'s own creative expression, not functional processes like memory filing or emotional processing, comparing the question of why we dream to asking why we make music.'
      }
    ]
  },
  {
    id: 'original-chess',
    title: 'The Ghost Move',
    author: 'Original',
    genre: 'Fiction',
    difficulty: 'easy',
    length: 'medium',
    content: `The chess tournament was held in the basement of a church in Reykjavik, and Katya Novak was losing.

She had not lost a rated game in fourteen months. She was seventeen years old, the youngest woman ever to earn the title of International Master from her country, and she was losing to a twelve-year-old boy from Denmark who played with the maddening calm of someone solving a math problem he already knew the answer to.

His name was Lars. He moved his pieces with two fingers, placing them in the center of each square with mechanical precision. He never touched a piece unless he intended to move it. He never looked up from the board. Katya found this infuriating.

She was down a bishop and a pawn with no compensation. In tournament chess, this is not a slight disadvantage. It is a slow death. The extra material gives the opponent an inevitability that builds with every exchange, every simplification of the position. Lars would trade pieces, reduce the game to an endgame, and grind her down with the patience of a machine.

Unless she found something.

Katya stared at the board. She had twenty-three minutes on her clock. Lars had forty. She needed a move that changed the nature of the position entirely, something that transformed the game from a technical endgame into chaos. In chaos, material means less. In chaos, the player with sharper instincts and more nerve has the advantage, and Katya had never lacked nerve.

She found it on her third pass through the position. It was a sacrifice, her knight for nothing but an exposed king and a disrupted pawn structure. Objectively, a computer would probably evaluate it as losing. But computers do not feel pressure. Twelve-year-old boys do.

She picked up her knight, placed it on the square, and pressed her clock. Then she looked up from the board for the first time in twenty minutes.

Lars blinked. His fingers hesitated over the board. He looked at the position. He looked at it again. For the first time in the entire game, he sat back in his chair.

Katya did not smile. She did not need to. The position was still losing, technically. But the game had changed. It was her game now, and they both knew it.`,
    questions: [
      {
        question: 'Why was Katya losing the game?',
        options: ['She had run out of time', 'She was down a bishop and a pawn', 'She made an illegal move', 'Her opponent was a grandmaster'],
        correct: 1,
        explanation: 'Katya was down a bishop and a pawn with no compensation, which in tournament chess represents a significant and typically decisive material disadvantage.'
      },
      {
        question: 'What was Katya\'s strategy with the knight sacrifice?',
        options: ['To win material back immediately', 'To force a draw by stalemate', 'To create chaos where instincts and nerve matter more than material', 'To run down Lars\'s clock'],
        correct: 2,
        explanation: 'Katya sacrificed the knight to transform the game from a technical endgame into chaos, where her sharper instincts and nerve would give her the advantage over her younger opponent.'
      },
      {
        question: 'What detail signals that Katya\'s sacrifice had the intended psychological effect?',
        options: ['Lars resigned immediately', 'Lars made a blunder on the next move', 'Lars hesitated and sat back in his chair for the first time', 'Lars called the arbiter'],
        correct: 2,
        explanation: 'Lars, who had played with mechanical calm the entire game, hesitated for the first time and sat back in his chair, showing that the sacrifice had disrupted his composure.'
      }
    ]
  },
  {
    id: 'original-fermi',
    title: 'The Great Silence',
    author: 'Original',
    genre: 'Science',
    difficulty: 'hard',
    length: 'long',
    content: `In the summer of 1950, the physicist Enrico Fermi was having lunch with colleagues at Los Alamos National Laboratory when the conversation turned to flying saucers. The topic was lighthearted, but Fermi, who had a habit of cutting through noise to reach the essential question, suddenly asked: "Where is everybody?"

His colleagues understood immediately what he meant. The question was not about flying saucers. It was about probability.

The Milky Way galaxy contains roughly two hundred billion stars. Even by conservative estimates, a significant fraction of those stars have planets, and a significant fraction of those planets orbit within the habitable zone where liquid water can exist. The galaxy is approximately thirteen billion years old, and it takes only a few hundred million years for intelligent life to develop technology once the right conditions exist, or so our single data point suggests. Given these numbers, the galaxy should be teeming with civilizations, many of them millions of years older than ours, with technologies so advanced they would be as incomprehensible to us as a smartphone would be to a trilobite.

And yet we see nothing. No signals. No probes. No megastructures blocking the light of distant stars. No evidence of any kind that intelligence exists anywhere but here. This discrepancy between the high probability of extraterrestrial civilizations and the total absence of evidence for them became known as the Fermi Paradox, and it remains one of the most disturbing open questions in science.

The proposed solutions are numerous, and none of them are comforting.

The first category suggests that intelligent life is far rarer than our estimates assume. Perhaps the origin of life is an event of such staggering improbability that it has occurred only once in the entire observable universe. Perhaps multicellular life is the bottleneck, or the development of brains, or the specific chain of catastrophes and recoveries that shaped our own evolution. Under this explanation, we are not just rare. We are alone, a single flickering candle in a darkness that extends in every direction without limit.

The second category is darker. Perhaps intelligent civilizations do arise regularly, but they do not survive long enough to make contact. Perhaps every species that develops sufficient technology to broadcast its presence across interstellar distances also develops sufficient technology to destroy itself. Nuclear weapons. Engineered pandemics. Artificial intelligence that outgrows its creators. Climate systems destabilized beyond recovery. If self-destruction is the typical outcome for technological civilizations, then the silence makes perfect sense. The galaxy is not empty. It is a graveyard.

A third category proposes that advanced civilizations are out there but are deliberately avoiding us. This is known as the Zoo Hypothesis: Earth is a nature preserve, and the older civilizations have agreed not to interfere with our development, the way a wildlife biologist might observe a newly discovered species without making contact. A variation of this, sometimes called the Dark Forest theory, is more sinister. Perhaps advanced civilizations remain silent because the universe is dangerous, and any civilization that reveals its location is destroyed by others. In this model, the cosmos is full of intelligent life, all of it hiding, all of it terrified, all of it maintaining silence as a survival strategy.

The physicist David Brin has pointed out that the Fermi Paradox carries an unusual epistemological burden: the evidence is an absence, and it is difficult to draw conclusions from something that is not there. Perhaps we lack the instruments to detect the signals. Perhaps we are looking in the wrong frequencies. Perhaps the answer is something so far outside our conceptual framework that we cannot even formulate it as a hypothesis.

What makes the paradox truly unsettling is not any particular solution but the fact that every solution implies something profound about the nature of existence. If we are alone, the universe is unimaginably vast and empty, and the responsibility for consciousness rests entirely on this one species on this one planet. If civilizations destroy themselves, our own future is a subject of urgent concern. If others are hiding, the universe is a more dangerous place than it appears.

Fermi asked his question over lunch and moved on to other topics. The rest of us have been trying to answer it ever since.`,
    questions: [
      {
        question: 'What is the core of the Fermi Paradox?',
        options: ['Why stars produce light', 'The discrepancy between the high probability of extraterrestrial civilizations and the absence of evidence for them', 'Whether faster-than-light travel is possible', 'How the universe began'],
        correct: 1,
        explanation: 'The Fermi Paradox is the contradiction between the statistical likelihood that many intelligent civilizations should exist in the galaxy and the complete lack of evidence that any of them do.'
      },
      {
        question: 'What does the "Dark Forest" theory propose?',
        options: ['Civilizations live in dense nebulae', 'Civilizations remain silent because revealing your location in the universe gets you destroyed', 'Forests on other planets block radio signals', 'Civilizations exist only in dark regions of the galaxy'],
        correct: 1,
        explanation: 'The Dark Forest theory proposes that the universe is full of intelligent life, but all civilizations maintain silence as a survival strategy because revealing your location risks destruction by others.'
      },
      {
        question: 'Why does the author say every solution to the Fermi Paradox is profound?',
        options: ['Because they all require advanced mathematics', 'Because each implies something significant about existence, whether we are alone, doomed, or in danger', 'Because they were all proposed by famous scientists', 'Because they all lead to the same conclusion'],
        correct: 1,
        explanation: 'Every solution carries profound implications: being alone means consciousness depends on us, self-destruction threatens our future, and hidden civilizations imply a dangerous cosmos.'
      },
      {
        question: 'What epistemological challenge does David Brin highlight about the paradox?',
        options: ['The math is too complex to verify', 'The evidence is an absence, making it difficult to draw conclusions', 'We cannot travel far enough to test the theories', 'The original question was asked as a joke'],
        correct: 1,
        explanation: 'Brin points out that the evidence for the Fermi Paradox is an absence of something, and it is inherently difficult to draw firm conclusions from something that is not there.'
      }
    ]
  }
];
