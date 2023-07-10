import React, { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import {
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  ToggleButton,
} from '@mui/material';
import any from '../assets/icons/any.png';
import strength from '../assets/icons/strength.png';
import cardio from '../assets/icons/cardio.png';
import HIIT from '../assets/icons/HIIT.png';
import yoga from '../assets/icons/yoga.png';
import hike from '../assets/icons/hike.png';
import '../styles/WorkoutPlan.css';

const WorkoutPlan = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [secondaryGoal, setSecondaryGoal] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutFreq, setWorkoutFreq] = useState('');
  const [workoutPlace, setWorkoutPlace] = useState('');
  const [planDays, setPlanDays] = useState('');

  const workoutOptions = [
    { value: 'any', label: 'Any', image: `${any}` },
    {
      value: 'Strength training',
      label: 'Strength training',
      image: `${strength}`,
    },
    {
      value: 'Cardiovascular training',
      label: 'Cardiovascular training',
      image: `${cardio}`,
    },
    {
      value: 'High-intensity interval training (HIIT)',
      label: 'High-intensity interval training (HIIT)',
      image: `${HIIT}`,
    },
    {
      value: 'Yoga and Pilates',
      label: 'Yoga and Pilates',
      image: `${yoga}`,
    },
    {
      value: 'Outdoor activities',
      label: 'Outdoor activities',
      image: `${hike}`,
    },
  ];

  const handleChange = (event, newValue) => {
    const { name, value } = event.target;

    switch (name) {
      case 'age':
        setAge(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'currentWeight':
        setCurrentWeight(value);
        break;
      case 'desiredWeight':
        setDesiredWeight(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'primaryGoal':
        setPrimaryGoal(value);
        break;
      case 'secondaryGoal':
        setSecondaryGoal(value);
        break;
      case 'workoutFreq':
        setWorkoutFreq(value);
        break;
      case 'workoutPlace':
        setWorkoutPlace(value);
        break;
      case 'planDays':
        setPlanDays(value);
        break;
      default:
        break;
    }
  };

  const handleFitnessLevelChange = (event, newFitnessLevel) => {
    setFitnessLevel(newFitnessLevel);
  };

  const handleWorkoutTypeChange = (event, newWorkoutType) => {
    setWorkoutType(newWorkoutType);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const text = `Create a personalized workout plan to help the user achieve their fitness goals. The user is a ${age}-year-old ${gender} who currently weighs ${currentWeight} kgs, stands at a height of ${height} cms, and desires to reach a weight of ${desiredWeight} kgs. Their primary fitness objective is ${primaryGoal}, and their secondary goal is ${secondaryGoal}. They prefer to focus on ${workoutType} workouts and has ${fitnessLevel} level of fitness. The ideal workout schedule for them is ${workoutFreq} times a week at ${workoutPlace}.Please provide a detailed workout plan for ${planDays} days, including suggested exercises, reps, and sets. Format your response using HTML. Use headings, subheadings, bullet points, and bold to organize the information. Do not display user information in the response.`;

    const user = JSON.parse(localStorage.getItem('user'));
    const headers = { Authorization: `Bearer ${user.token}` };

    // Get the submit button element
    const submitButton = document.querySelector('.submit-btn');

    submitButton.addEventListener('click', () => {
      // Disable the submit button
      submitButton.disabled = true;

      // Display loading indicator
      const loadingIndicator = document.querySelector('.loading-indicator');
      loadingIndicator.style.display = 'block';

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/planner/workout-plan`,
          { text },
          { headers }
        )
        .then((response) => {
          console.log(response.data.text);
          const workoutPlan = document.querySelector('.workout-plan');
          workoutPlan.innerHTML = response.data.text;

          // Hide loading indicator
          loadingIndicator.style.display = 'none';

          // Enable the submit button
          submitButton.disabled = false;
        })
        .catch((error) => {
          console.error(error);

          // Hide loading indicator
          loadingIndicator.style.display = 'none';

          // Enable the submit button
          submitButton.disabled = false;
        });
    });
  }
  // Hide loading indicator initially
  const loadingIndicator = document.querySelector('.loading-indicator');
  loadingIndicator.style.display = 'none';

  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <div className='form-row first-row'>
          <div>
            <InputLabel id='age'>Age</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              name='age'
              value={age}
              onChange={handleChange}
              placeholder='Enter your age'
            />
          </div>
          <div>
            <InputLabel id='gender-selector' required>
              Gender
            </InputLabel>
            <Select
              sx={{ minWidth: 200 }}
              variant='outlined'
              labelId='gender-selector'
              name='gender'
              value={gender}
              onChange={handleChange}
              displayEmpty
              placeholder='Select Gender'
            >
              <MenuItem value='' disabled>
                -- Select Gender --
              </MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </div>
        </div>
        <div className='form-row second-row'>
          <div>
            <InputLabel id='current-weight' required>
              Current Weight
            </InputLabel>
            <div>
              <TextField
                id='outlined-basic'
                placeholder='Weight (in kgs)'
                variant='outlined'
                name='currentWeight'
                value={currentWeight}
                onChange={handleChange}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </div>
          </div>
          <div>
            <InputLabel id='desired-weight' required>
              Desired Weight
            </InputLabel>
            <TextField
              id='outlined-basic'
              placeholder='Weight (in kgs)'
              variant='outlined'
              name='desiredWeight'
              value={desiredWeight}
              onChange={handleChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </div>
          <div>
            <InputLabel id='height' required>
              Height
            </InputLabel>
            <TextField
              id='outlined-basic'
              placeholder='Height (in cms)'
              variant='outlined'
              name='height'
              value={height}
              onChange={handleChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </div>
        </div>
        <div className='form-row third-row'>
          <div>
            <InputLabel id='fitness-level' required>
              What is your fitness level?
            </InputLabel>
            <ToggleButtonGroup
              exclusive
              name='fitnessLevel'
              value={fitnessLevel}
              onChange={handleFitnessLevelChange}
            >
              <ToggleButton value='beginner' aria-label='Beginner'>
                Beginner
              </ToggleButton>
              <ToggleButton value='intermediate' aria-label='Intermediate'>
                Intermediate
              </ToggleButton>
              <ToggleButton value='advanced' aria-label='Advanced'>
                Advanced
              </ToggleButton>
              <ToggleButton value='expert' aria-label='Expert'>
                Expert
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className='form-row fourth-row'>
          <div>
            <InputLabel id='primary-goal-label' required>
              What is your primary fitness goal?
            </InputLabel>
            <Select
              sx={{ minWidth: 400 }}
              labelId='primary-goal-label'
              id='demo-simple-select'
              label='Fitness goal'
              name='primaryGoal'
              value={primaryGoal}
              onChange={handleChange}
              displayEmpty
              placeholder='Select your primary fitness goal'
            >
              <MenuItem value='' disabled>
                -- Select your primary fitness goal --
              </MenuItem>
              <MenuItem value={'Weight loss'}>Weight loss</MenuItem>
              <MenuItem value={'Muscle gain'}>Muscle gain</MenuItem>
              <MenuItem value={'Endurance'}>Endurance</MenuItem>
              <MenuItem value={'Flexibility and mobility'}>
                Flexibility and mobility
              </MenuItem>
              <MenuItem value={'Functional fitness'}>
                Functional fitness
              </MenuItem>
              <MenuItem value={'Sports performance'}>
                Sports performance
              </MenuItem>
              <MenuItem value={'Rehabilitation'}>Rehabilitation</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id='secondary-goal-label' required>
              What is your secondary fitness goal?
            </InputLabel>
            <Select
              sx={{ minWidth: 400 }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Fitness goal'
              name='secondaryGoal'
              value={secondaryGoal}
              onChange={handleChange}
              displayEmpty
              placeholder='Select your secondary fitness goal'
            >
              <MenuItem value='' disabled>
                -- Select your secondary fitness goal --
              </MenuItem>
              <MenuItem value={'Weight loss'}>Weight loss</MenuItem>
              <MenuItem value={'Muscle gain'}>Muscle gain</MenuItem>
              <MenuItem value={'Endurance'}>Endurance</MenuItem>
              <MenuItem value={'Flexibility and mobility'}>
                Flexibility and mobility
              </MenuItem>
              <MenuItem value={'Functional fitness'}>
                Functional fitness
              </MenuItem>
              <MenuItem value={'Sports performance'}>
                Sports performance
              </MenuItem>
              <MenuItem value={'Rehabilitation'}>Rehabilitation</MenuItem>
            </Select>
          </div>
        </div>
        <div id='fifth-row' className='form-row fifth-row'>
          <InputLabel id='workout-types-label' required>
            What type of workout do you prefer?
          </InputLabel>
          <ToggleButtonGroup
            color='error'
            value={workoutType}
            exclusive
            onChange={handleWorkoutTypeChange}
            aria-label='workout type'
          >
            {workoutOptions.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                aria-label={option.label}
                sx={{
                  display: 'block',
                  border: 'none',
                }}
              >
                <img
                  className='workout-icons'
                  src={option.image}
                  alt={option.label}
                />
                <label htmlFor=''>{option.label}</label>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className='form-row sixth-row'>
          <InputLabel id='workout-week-label'>
            How often do you workout in a week?
          </InputLabel>
          <Slider
            aria-label='WeekDays'
            defaultValue={1}
            step={1}
            marks={true}
            min={1}
            max={7}
            name='workoutFreq'
            value={workoutFreq}
            onChange={handleChange}
            valueLabelDisplay='auto'
          />
        </div>

        <div className='form-row seventh-row'>
          <div>
            <InputLabel id='workout-place-label'>
              Select whether you workout at the home or gym?
            </InputLabel>
            <Select
              sx={{ minWidth: 400 }}
              id='demo-simple-select'
              name='workoutPlace'
              value={workoutPlace}
              onChange={handleChange}
              displayEmpty
              placeholder='Select where you want to workout'
            >
              <MenuItem value='' disabled>
                -- Select where you want to workout --
              </MenuItem>
              <MenuItem value={'Gym'}>Gym</MenuItem>
              <MenuItem value={'Home with no equipments'}>
                Home with no equipments
              </MenuItem>
              <MenuItem value={'Home with basic equipments'}>
                Home with basic equipments
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className='form-row eighth-row'>
          <div>
            <InputLabel id='demo-simple-select-label'>
              How many days should the workout plan cover?
            </InputLabel>
            <Slider
              aria-label='WeekDays'
              defaultValue={1}
              valueLabelDisplay='auto'
              step={1}
              marks={true}
              min={1}
              max={30}
              name='planDays'
              value={planDays}
              onChange={handleChange}
            />
          </div>
        </div>
        <input className='submit-btn' type='submit' />
      </form>
      <p className='loading-indicator'>Loading...</p>

      <div className='workout-plan'></div>
    </div>
  );
};

export default WorkoutPlan;
