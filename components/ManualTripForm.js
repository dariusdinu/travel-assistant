import { useRef, useState } from "react";
import { Button, Input } from "./UI";
import { StyleSheet, View } from "react-native";
import DateInput from "./DateInput";

function ManualTripForm({ onSubmit }) {
  const inputDestinationRef = useRef(null);
  const inputArriveDateRef = useRef(null);
  const inputLeaveDateRef = useRef(null);
  const inputBudgetRef = useRef(null);
  const inputAccommodationPreferencesRef = useRef(null);
  const inputTransportationPreferencesRef = useRef(null);
  const inputTravelStyleRef = useRef(null);
  const inputAccessibilityRequirementsRef = useRef(null);

  const [enteredDestination, setEnteredDestination] = useState("My location");
  const [enteredArriveDate, setEnteredArriveDate] = useState(new Date());
  const [enteredLeaveDate, setEnteredLeaveDate] = useState(new Date());
  const [enteredBudget, setEnteredBudget] = useState(0);

  function handleInputValueUpdate(inputField, updatedValue) {
    switch (inputField) {
      case "destination":
        setEnteredDestination(updatedValue);
        break;
      case "arriveDate":
        setEnteredArriveDate(updatedValue);
        break;
      case "leaveDate":
        setEnteredLeaveDate(updatedValue);
        break;
      case "budget":
        setEnteredBudget(updatedValue);
      default:
        break;
    }
  }

  function handleFormSubmit() {
    onSubmit({
      destination: enteredDestination,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          blurOnSubmit={false}
          label="Destination"
          onSubmitEditing={() => {
            inputDestinationRef.current.focus();
          }}
          onUpdateValue={(value) =>
            handleInputValueUpdate("destination", value)
          }
          placeholder="Destination"
          ref={inputDestinationRef}
          returnKeyType="next"
          value={enteredDestination}
        />
        <DateInput
          label="Arrival Date"
          enteredDate={enteredArriveDate.toDateString()}
        />
        <DateInput
          label="Leave Date"
          enteredDate={enteredArriveDate.toDateString()}
        />
        <Input
          blurOnSubmit={false}
          label="Budget"
          onSubmitEditing={() => {
            inputBudgetRef.current.focus();
          }}
          onUpdateValue={(value) => handleInputValueUpdate("budget", value)}
          placeholder="Budget"
          ref={inputBudgetRef}
          returnKeyType="next"
          value={enteredBudget}
          inputMode="decimal"
        />
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => handleFormSubmit()}>Add trip</Button>
      </View>
    </View>
  );
}

export default ManualTripForm;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  buttons: {
    marginTop: 12,
  },
});
