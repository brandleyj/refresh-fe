// { answer: value, question_id: questions[currentStep].id }
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";
import WeightHeight from "./WeightHeight";
import Height from "./Height";
import { UserContext } from '../../../contexts/UserContext';
import { axiosWithAuth } from "../../../helpers/axiosWithAuth";
const StepObject = props => {
  const user = useContext(UserContext);
  //hooks
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState();
  console.log(user);

  //Get Questions on Mount
  useEffect(() => {
    axiosWithAuth()
      .get("/questiongroups/1")
      .then(res => {
        setQuestions(res.data.questions);
      })
      .catch(err => console.log(err));
  }, []);

  //set values for slider
  const handleChanges = value => {
    setQa(value)    
};
const sliderValue =  3;
  return (
          <OnBoardContainer>
            <form onSubmit={profile.handleSubmit}>
              {profile.currentStep < 4 &&
              <Question>{question.question}</Question>
              }
              {profile.currentStep >=4 &&
              <LongQuestion>{question.question}</LongQuestion>
              }
              {profile.currentStep <= 2 &&
              <OnboardTxt>Don't worry, this stays between us</OnboardTxt>
              }
            {profile.currentStep <=2 && (<WeightHeight  />)}
            {profile.currentStep == 3 && (  
            <FlexHolder>
                <Option onClick={() => handleChanges("Never")}>Never</Option>
                <Option onClick={() => handleChanges("Sometimes")}>Sometimes</Option>
                <Option onClick={() => handleChanges("Always")}>Always</Option>
            </FlexHolder> )}
            {profile.currentStep >=4 && (             
                <StyledSlider
                defaultValue={sliderValue}
                max={7}
                renderTrack={Track}
                renderThumb={Thumb}
                onAfterChange={handleChanges}
              />
)}
              <Button onClick={profile.handleSubmit} data-answer={qa} data-question={question.id}>Continue</Button>
              {profile.currentStep <= 2 && (
                <ButtonNoColor onClick={profile.handleSubmit} value={"blurb"}>
                  I don't feel comfortable answering
                </ButtonNoColor>
              )}
            </form>
          </OnBoardContainer>
    );
};
    console.log(value);
    setAnswer(value);
  };

  //handle submit
  const handleSubmit = e => {
    console.log(e.target);
    e.preventDefault();
    if (currentStep === questions.length - 1) {
      console.log("here", questions[currentStep]);
      postAnswer({ answer, question_id: questions[currentStep].id });
      setQuestions([]);
      user.setUser(false);
      props.history.push("/dashboard");
    } else {
      const defaultAnswer = answer ? answer : "Chose not to answer";
      console.log("here", questions[currentStep]);
      postAnswer({
        answer: defaultAnswer,
        question_id: questions[currentStep].id
      });
      setCurrentStep(currentStep + 1);
    }
  };

  //axios post
  const postAnswer = answer => {
    return axiosWithAuth()
      .post("/answers", answer)
      .then(res => console.log(res));
  };

  //slider thumb and track
  const Thumb = (props, state) => (
    <StyledThumb {...props}>{state.valueNow}</StyledThumb>
  );
  const Track = (props, state) => {
    return <StyledTrack {...props} index={state.index} value={7} />;
  };

  //StepDot helper function
  const StepDotCount = currentStep => {
    return `&:nth-of-type(${currentStep + 1}){
      color: #E05CB3;
      `;
  };

  //render
  return questions.length ? (
    // <div>
    //   {questions[currentStep].question}
    //   <input type="text" onChange={(e)=> setAnswer(e.target.value)}/>
    //   <input type="submit" onClick ={handleSubmit} data-answer={answer}/>
    // </div>
    <OnBoardContainer>
      <StepDots currentDot={StepDotCount} currentStep={currentStep}>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </StepDots>
      <form onSubmit={handleSubmit}>
        {/* First Question, Concent Button*/}
        {currentStep < 3 && (
          <Question>{questions[currentStep].question}</Question>
        )}
        {/* First Question, Concent Button*/}
        {currentStep >= 3 && (
          <LongQuestion>{questions[currentStep].question}</LongQuestion>
        )}
        {/* Returns First and second Question */}
        {currentStep === 0 && (
          <>
            <OnboardTxt>Dont worry, this stays between us</OnboardTxt>
            <WeightHeight />
          </>
        )}
        {currentStep === 1 && (
          <>
            <OnboardTxt>Dont worry, this stays between us</OnboardTxt>
            <Height />
          </>
        )}
        {/* WILL GIVE OVERWHELMED OPTIONS, Question 3*/}
        {currentStep === 2 && (
          <FlexHolder>
            <Option onClick={() => setAnswer("Never")}>Never</Option>
            <Option onClick={() => setAnswer("Sometimes")}>Sometimes</Option>
            <Option onClick={() => setAnswer("Always")}>Always</Option>
          </FlexHolder>
        )}
        {/* Slider Group , Questions 4 - 10*/}
        {currentStep >= 3 && (
          <StyledSlider
            defaultValue={3}
            max={7}
            renderTrack={Track}
            renderThumb={Thumb}
            onChange={handleChanges}
          />
        )}
        <Button onClick={handleSubmit} data-answer={answer}>
          Continue
        </Button>
        {/* Bypass weight and height, Questions 1 and 2 */}
        {currentStep <= 1 && (
          <ButtonNoColor onClick={handleSubmit} data-answer={answer}>
            I don't feel comfortable answering
          </ButtonNoColor>
        )}
      </form>
    </OnBoardContainer>
  ) : (
    <p>Loading</p>
  );
};

// STYLED COMPONENTS
//Onboarding Reusable Styles
// we abstract out reusable global styles later on -JC
const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 0.2rem;
  margin: 8rem 0 13rem;
`;
const StyledThumb = styled.div`
  height: 2.5rem;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #e05cb3;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  margin-top: -1rem;
`;
const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props => (props.index === 1 ? "#ddd" : "#E05CB3")};
  border-radius: 2rem;
`;
const OnBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Catamaran", sans-serif;
  margin: auto;
  line-height: 1.5;
  background-color: #3a3699;
  color: #7f7cca;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  padding: 2.5rem 4rem;
`;
const Question = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  line-height: 4.9rem;
  letter-spacing: 3.5px;
  color: #ffffff;
  margin: 6rem 0 2rem;
`;
const LongQuestion = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  line-height: 4.1rem;
  letter-spacing: 0.035em;
  color: #ffffff;
  margin: 6rem 0 2rem;
`;
const OnboardTxt = styled.p`
font-size: 1.6rem;
line-height: 2.6rem;
letter-spacing: 2px;
text-align:center;
color: #A7A4E6;
margin: 0 auto;
`;
const Option = styled.a`
  font-size: 1.6rem;
  line-height: 26px;
  letter-spacing: 2px;
  color: #ffffff;
  &:hover {
    background: #e05cb3;
    padding: 0 1rem;
    border-radius: 0.3rem;
  }
`;
const Button = styled.a`
  display: flex;
  justify-content: space-evenly;
  border-radius: 0.5rem;
  padding: 1.5rem 0.8rem;
  width: 100%;
  text-align: center;
  margin: 0 auto 2.4rem;
  background: #e05cb3;
  color: white;
  font-size: 1.6rem;
  letter-spacing: 0.1rem;
`;
const ButtonNoColor = styled.a`
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 2px;
  color: #a7a4e6;
`;
const FlexHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem auto;
  align-items: flex-start;
  width: 100%;
  padding: 2.5rem 0 9rem;
`;

const StepDots = styled.div`
  display: flex;
  font-size: 8rem;
  margin: 0 auto;

  p {
    padding-right: 1rem;
    color: #ffffff;
    ${props => props.currentDot(props.currentStep)}
  }
`;
export default StepObject;
