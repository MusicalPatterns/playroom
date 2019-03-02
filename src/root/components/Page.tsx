// tslint:disable

import * as React from 'react'
import { PageName } from '../../pattern'
import { PageProps } from './types'

const Page: (props: PageProps) => JSX.Element =
    ({ pageName }: PageProps): JSX.Element => {
        switch (pageName) {
            case PageName.ABOUT:
                return (
                    <div {...{ className: 'row' }}>
                        <div {...{ className: 'left' }}>
                            <h1>About</h1>
                            <p>
                                Welcome to Musical Patterns.
                            </p>
                            <p>
                                The music here has all been written
                                in <a {...{ href: 'https://github.com/MusicalPatterns' }}>code</a>. Each
                                piece exists not a single listening experience but as a range of possibilities which you
                                can explore using its controls.
                            </p>
                            <p>
                                The ideas I am exploring include spatialization (if you have a VR headset you can
                                experience this dimension of my work), unconventional harmony, irrational rhythm, pitch
                                and rhythm circularity, and various other illusions and ambiguities.
                            </p>
                            <p>
                                I refer to the musical pieces here as "patterns" to lean
                                - toward the aesthetics of visual texture,
                                - toward the aesthetics of mathematics, and
                                - away from the aesthetics of songwriting.
                            </p>
                            <p>
                                They're brief and repeat indefinitely, so listen inwards.
                            </p>
                            <h3>
                                test-driven composition
                            </h3>
                            <p>
                                For this project I have used a software development technique called test-driven
                                development, or TDD. What this means is that I begin by describing new behavior I want
                                in the form of an automated test (for example, I might write a test that expects every
                                melodic interval to lay within a particular harmonic complexity threshold). The test
                                fails at first, of course, because the music does not yet exhibit the desired behavior.
                                But then I work on the code for the music itself until the test passes.
                            </p>
                            <p>
                                A benefit of this approach is that once the desired musical behavior is achieved, it is
                                thenceforth protected by this test; I can continue to add new layers of complexity to
                                the piece, and if any new feature breaks this existing one, the test will fail, alerting
                                me to reconsider my approach. The test also serves as living documentation of my earlier
                                intentions, explaining what exactly I cared about in an unambiguous way (I can't tell
                                you how many times I've come across notes I took in human language which surely made
                                sense to me at the time but which are now nothing but gibberish).
                            </p>
                            <p>
                                Over time the test suite grows. Having eliminated my fear of compromising previous
                                achievements, I remain perpetually free to experiment. I also open the door to
                                heretofore unobtainable levels of complexity.
                            </p>
                            <h3>
                                a new aesthetic
                            </h3>
                            <p>
                                I learned TDD on the job as a software engineer, but having spent some time now applying
                                it to my own music, I've come to believe that the practice has potential to inspire the
                                field of music composition. Certainly it's not for everybody, but it is capable of
                                breeding an intriguing (dare I say original) musical aesthetic. Music written in code is
                                fairly commonplace, and already boasts a distinct aesthetic, but test-driven music goes
                                beyond even that.
                            </p>
                            <p>
                                Allow me to review the aesthetics of music written in code. It tends to sound less
                                song-like, and that's a result of the composing process. Compare it with traditional
                                composition. When you start with a blank page of sheet music, you kind of have to start
                                at the beginning, at least the beginning of some section. Writing music in code, though,
                                you could start by engineering a musical property which is distributed throughout the
                                piece; you could spend a whole morning and accomplish a big chunk of your work and still
                                not yet have any final material that could actually be heard. It's more like designing a
                                wallpaper pattern, starting with a basic outline, filling in with increasing detail over
                                time. It's working inwards. It's not as intuitive.
                            </p>
                            <p>
                                Test-driving music is similar, but further. It allows you to work even less intuitively.
                                The tests afford you to pick back up after several months of inactivity. For the past
                                few years I would build the occasional little musical experiment in code but did not
                                test-drive it. Whenever I would try to pick one of them back up, I would find that I'd
                                lost too much context on the purposes for many of its components, and didn't know how to
                                contribute any further to it. I learned to think of my code-based music in a certain
                                way: I felt pressured to start and complete a composition in a single sitting (for some
                                definition of sitting), because I knew once I stepped away, I may as well start from
                                scratch if I had ideas for revisions later. Well now I don't have to think like that.
                                I'm composing a dozen pieces at once. I keep having little ideas for tweaks to various
                                of time over time. I occasionally discover surprising connections between them. And when
                                the place you were at before has faded from your mind, it's actually a feature, not a
                                bug! It's an injection of a fresh new perspective into things. Of course it's still your
                                perspective, but it's a new you.
                            </p>
                            <p>
                                I don't write outwards, I write inwards. And now I can do that on another scale.
                            </p>
                            <p>
                                Test-driving has other benefits, too, which contribute to the aesthetic. Forcing
                                yourself to describe the behavior you want first in the form of a test ensures you think
                                critically and carefully about what you're doing, rather than just slapping something
                                together, QA'ing it with your ears and shipping. Also, by following a short cycle of
                                testing, implementing, testing, implementing, it reduces the tendency to get fanciful,
                                adding anticipatory bells and whistles which aren't subservient to the immediate and
                                minimum satisfaction of the goal you laid out in your latest test.
                            </p>
                            <p>
                                Test-driving music is so suited to the way I approach composing myself that it has
                                revolutionized my musical creativity. If others are out there who approach composition
                                similarly to me, or who might benefit from experimenting with such approaches, perhaps
                                TDD would be worth a shot. Actually, the page about unit testing in the wiki for the
                                SuperCollider platform
                                includes <a {...{ href: 'https://github.com/supercollider/supercollider/wiki/Unit-Testing-Guide#test-driven-development-redgreen-testing' }}>a
                                section about TDD</a>, so maybe it's not too far on the horizon.
                            </p>
                            <h3>
                                statement of purpose
                            </h3>
                            <p>
                                One of my goals with this project was to consolidate my musical work under a single
                                system. Abstracting features across the patterns breeds creativity and builds me toward
                                something greater. Essentially I am developing my own specialized musical instrument.
                            </p>
                            <p>
                                I nonetheless consider this output to be proof-of-concept. Electronic music production
                                is not an art I aspire to master. I did not choose to build this project for the web
                                because browsers offer the finest digital audio palette, but rather because they offer
                                free and instantaneous content delivery anywhere.
                            </p>
                            <p>
                                Using code to organize my musical ideas is having a profound impact on my creative
                                process, but the sounds produced here are not how I really want to express myself. I
                                hope you enjoy playing with my patterns on this site, but understand that I consider
                                them not final products but rather as sketches, one tool among others to help
                                communicate my intentions to potential human performers.
                            </p>
                            <p>
                                I am actively planning live performances, so you can reach me here if you are
                                interested: douglas.blumeyer@gmail.com
                            </p>
                            <h3>
                                the past and future
                            </h3>
                            <p>
                                <a {...{ href: 'https://www.dropbox.com/s/kqd5emgc41b1ap4/Fun%20Musical%20Ideas%20-%20v1.0%20-%20July%202014.pdf?dl=0' }}>Several
                                    years ago I drafted a book of sorts (unpublished) which I call "Fun Musical
                                    Ideas".</a> In its introduction, I wrote that one of my purposes with the book was
                                to
                                "inspire technically proficient minds to join me in the creation of the tools needed for
                                musicians to make these new kinds of music with". At that time I had not yet learned to
                                write code at the level required to achieve many of my ideas, so I was reaching out to
                                others, just hoping I'd get lucky and connect with a sympathetic and competent soul.
                            </p>
                            <p>
                                Well, I'm proud and delighted to say that today I can manage the technical stuff myself.
                            </p>
                            <p>
                                This book has 26 chapters, and eventually I plan to represent every idea from it in a
                                pattern here. Along the way, I expect to come up with a few more.
                            </p>
                            <p>
                                Douglas Blumeyer, March 2019
                            </p>
                        </div>
                        <div{...{ className: 'right closed' }}/>
                    </div>
                )
            default:
                return <div/>
        }
    }

export default Page
