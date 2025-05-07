import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard';
import Confetti from 'react-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import SecretCodeCard from './SecretCodeCard';

export default function Cards({ setMusicPlaying, handleShowMainContent }) {
    const [cardState, setCardState] = useState("intro"); // Tracks the current card
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [showConfetti, setShowConfetti] = useState(false)

    // Function to go back to "Can you be mine forever" card
    const goToMainQuestion = () => setCardState("mainQuestion");

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        updateWindowSize()
        window.addEventListener('resize', updateWindowSize)
        return () => window.removeEventListener('resize', updateWindowSize)
    }, [])

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        updateWindowSize()
        window.addEventListener('resize', updateWindowSize)

        return () => {
            window.removeEventListener('resize', updateWindowSize)
        }
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen flex items-center justify-center p-4">
                {/* Conditionally render cards based on the state */}
                {cardState === "intro" && (
                    <motion.div
                    key="intro"
                    className="flex flex-col items-center justify-center h-screen text-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-sans font-extrabold tracking-tight uppercase mb-4">🥹 HAPPIEEEEEEEEEE BIRHDAYYYYYYYY</h1>
                    <p className="text-lg mb-8">You are my cutest BABY GURLLL</p>
                    <button
                    onClick={() => setCardState("initial")}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
                >
                    Yaaayyyyyyy!!!
                </button>
            </motion.div> 
        )}   


                {cardState === "initial" && (
                    <QuestionCard
                        key="initial-card"
                        emoji="💖"
                        question="At first, I want to ask you something before we go ahead..."
                        showButtons={false}
                        btnText="Click here to know"
                        onAnswer={() => {
                            setCardState("mainQuestion")
                            setMusicPlaying(true)
                        }}
                    />
                )}

                {cardState === "mainQuestion" && (
                    <QuestionCard
                        key="main-question"
                        emoji="🥰"
                        question="Can you be my Baby Gurl forever?"
                        onAnswer={(answer) => {
                            if (answer) {
                                setCardState("yesResponse")
                                setShowConfetti(true)
                            }
                            else setCardState("areYouSure");
                        }}
                    />
                )}

                {cardState === "yesResponse" && (
                    <QuestionCard
                        key="yes-response"
                        emoji="🩷"
                        question="Yesss!...I know you can not choose that 'No' option... You always make my heart smile! I’m so lucky to have you in my life."
                        showButtons={false}
                        btnText="More love ahead"
                        onAnswer={() => setCardState("secretCode")} // Add a new action here
                    />
                )}

                {cardState === "secretCode" && <SecretCodeCard onCorrect={handleShowMainContent} />}

                {cardState === "areYouSure" && (
                    <QuestionCard
                        key="are-you-sure"
                        emoji="🙃"
                        question="Are you sure?"
                        onAnswer={(answer) => {
                            if (answer) setCardState("finalNoResponse");
                            else goToMainQuestion();
                        }}
                    />
                )}

                {cardState === "finalNoResponse" && (
                    <QuestionCard
                        key="final-no-response"
                        emoji="🥺"
                        question="Oh no! You can't really say no to this! You're already my Baby Girl. Go back and make the right choice!"
                        showButtons={false}
                        btnText="Go back"
                        onAnswer={goToMainQuestion}
                    />
                )}
                {showConfetti &&
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        numberOfPieces={500}
                        recycle={false}
                        colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093', '#C71585']}
                        confettiSource={{
                            x: windowSize.width / 2,
                            y: windowSize.height / 2,
                            w: 0,
                            h: 0
                        }}
                        initialVelocityX={{ min: -7, max: 7 }}
                        initialVelocityY={{ min: -7, max: 7 }}
                        gravity={0.001}
                        tweenDuration={4000}
                    />}
            </motion.div>
        </AnimatePresence>
    )
}
