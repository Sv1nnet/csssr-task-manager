import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { NewPassword, Question, RequestForQuestion } from './_blocks';

const restorePasswordMap = [
  RequestForQuestion,
  Question,
  NewPassword,
]

const RestorePassword = () => {
  const [step, setStep] = useState(0)
  const [stepData, setStepData] = useState(null)

  const handleSuccess = (data) => {
    setStep(step + 1)
    setStepData(data)
  }

  const Step = restorePasswordMap[step]

  if (!Step) return <Redirect to="/signup" />

  return (
    <div>
      <Step onSuccess={handleSuccess} stepData={stepData} />
    </div>
  );
};

export default RestorePassword;
