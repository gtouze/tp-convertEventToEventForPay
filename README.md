# TP

## Run test

```sh
npm i #First time only
npm run test
```

## Subject

class Event{  
  startDate  
  endDate  
}

function convertEventToEventForPay(){  
}

class EventForPay  
end

We have a class Event that can have an unlimited duration.  
For pay purposes, we do not pay our employees the same rate if the work is done during the day or during the night.  
The night starts at 10pm, and ends at 6am.

What would be the first test that we write?

test one -> the event starts during the day ends during the day.  
test two -> the event starts during the night ends during the night.  
test three -> the event starts day ends during the night.  
test four -> the event starts during the night ends during the day.  
test five -> the event starts during the day, continues during the night and ends during the day
