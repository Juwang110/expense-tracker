import {
  Accordion,
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  Alert,
} from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

export default function FinancialSurvey() {
  const [transportExpense, setTransportExpense] = useState();
  const [flightExpense, setFlightExpense] = useState();
  const [housingExpense, setHousingExpense] = useState();
  const [foodExpense, setFoodExpense] = useState();
  const [medicalExpense, setMedicalExpense] = useState();
  const [wellnessExpense, setWellnessExpense] = useState();
  const [loanExpense, setLoanExpense] = useState();
  const [entExpense, setEntExpense] = useState();
  const [clothingExpense, setClothingExpense] = useState();
  const [insuranceExpense, setInsuranceExpense] = useState();
  const [itemsExpense, setItemsExpense] = useState();
  const [saveExpense, setSaveExpense] = useState();
  const [miscExpense, setMiscExpense] = useState();

  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [showHousingModal, setShowHousingModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [showWellnessModal, setShowWellnessModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showEntModal, setShowEntModal] = useState(false);
  const [showClothingModal, setShowClothingModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showMiscModal, setShowMiscModal] = useState(false);
  const [showFieldsAlert, setFieldsAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const surveyData = {
      id: localStorage.getItem("id"),
      transportExpense: transportExpense,
      flightExpense: flightExpense,
      housingExpense: housingExpense,
      foodExpense: foodExpense,
      medicalExpense: medicalExpense,
      wellnessExpense: wellnessExpense,
      loanExpense: loanExpense,
      entExpense: entExpense,
      clothingExpense: clothingExpense,
      insuranceExpense: insuranceExpense,
      itemsExpense: itemsExpense,
      saveExpense: saveExpense,
      miscExpense: miscExpense,
    };

    if (
      !transportExpense ||
      !flightExpense ||
      !housingExpense ||
      !foodExpense ||
      !medicalExpense ||
      !wellnessExpense ||
      !loanExpense ||
      !entExpense ||
      !clothingExpense ||
      !insuranceExpense ||
      !itemsExpense ||
      !saveExpense ||
      !miscExpense
    ) {
      setFieldsAlert(true);
      return;
    } else {
      setFieldsAlert(false);
    }

    axios
      .post("http://localhost:5000/api/handle_survey", surveyData)
      .then((response) => {
        if (response.data.message === "success") {
          console.log("yay");
        }
      })
      .catch((error) => {
        console.error("Error doing survey:", error);
      });
  }

  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>What is Flowbite?</Accordion.Title>
        <Accordion.Content>
          <form className="flex max-w-md flex-col gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="Transport" value="Transport Expenses" />
              </div>
              <TextInput
                id="Transport"
                icon={HiMail}
                placeholder="transport expense"
                required
                helperText={
                  <>
                    Input your monthly transport expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowTransportModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={transportExpense}
                onChange={(e) => setTransportExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Flight" value="Flight Expenses" />
              </div>
              <TextInput
                id="Flight"
                icon={HiMail}
                placeholder="flight expense"
                required
                helperText={
                  <>
                    Input your monthly flight expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowFlightModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={flightExpense}
                onChange={(e) => setFlightExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Housing" value="Housing Expenses" />
              </div>
              <TextInput
                id="Housing"
                icon={HiMail}
                placeholder="housing expense"
                required
                helperText={
                  <>
                    Input your monthly housing expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowHousingModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={housingExpense}
                onChange={(e) => setHousingExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Food" value="Food Expenses" />
              </div>
              <TextInput
                id="Food"
                icon={HiMail}
                placeholder="food expense"
                required
                helperText={
                  <>
                    Input your monthly food expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowFoodModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={foodExpense}
                onChange={(e) => setFoodExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Medical" value="Medical Expenses" />
              </div>
              <TextInput
                id="Medical"
                icon={HiMail}
                placeholder="medical expense"
                required
                helperText={
                  <>
                    Input your monthly medical expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowMedicalModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={medicalExpense}
                onChange={(e) => setMedicalExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Wellness" value="Wellness Expenses" />
              </div>
              <TextInput
                id="Wellness"
                icon={HiMail}
                placeholder="wellness expense"
                required
                helperText={
                  <>
                    Input your monthly wellness expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowWellnessModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={wellnessExpense}
                onChange={(e) => setWellnessExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Loan" value="Loan Expenses" />
              </div>
              <TextInput
                id="Loan"
                icon={HiMail}
                placeholder="loan expense"
                required
                helperText={
                  <>
                    Input your monthly loan expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowLoanModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={loanExpense}
                onChange={(e) => setLoanExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Entertainment" value="Entertainment Expenses" />
              </div>
              <TextInput
                id="Entertainment"
                icon={HiMail}
                placeholder="entertainment expense"
                required
                helperText={
                  <>
                    Input your monthly entertainment expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowEntModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={entExpense}
                onChange={(e) => setEntExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Clothing" value="Clothing Expenses" />
              </div>
              <TextInput
                id="Clothing"
                icon={HiMail}
                placeholder="clothing expense"
                required
                helperText={
                  <>
                    Input your monthly clothing expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowClothingModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={clothingExpense}
                onChange={(e) => setClothingExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Insurance" value="Insurance Expenses" />
              </div>
              <TextInput
                id="Insurance"
                icon={HiMail}
                placeholder="insurance expense"
                required
                helperText={
                  <>
                    Input your monthly insurance expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowInsuranceModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={insuranceExpense}
                onChange={(e) => setInsuranceExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Items" value="Items Expenses" />
              </div>
              <TextInput
                id="Items"
                icon={HiMail}
                placeholder="items expense"
                required
                helperText={
                  <>
                    Input your monthly items expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowItemsModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={itemsExpense}
                onChange={(e) => setItemsExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Save" value="Save Expenses" />
              </div>
              <TextInput
                id="Save"
                icon={HiMail}
                placeholder="save expense"
                required
                helperText={
                  <>
                    Input your monthly save expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowSaveModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={saveExpense}
                onChange={(e) => setSaveExpense(e.target.value)}
              />

              <div className="mb-2 block">
                <Label htmlFor="Misc" value="Miscellaneous Expenses" />
              </div>
              <TextInput
                id="Misc"
                icon={HiMail}
                placeholder="miscellaneous expense"
                required
                helperText={
                  <>
                    Input your monthly miscellaneous expenses (USD):
                    <a
                      href="#"
                      className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => setShowMiscModal(true)}
                    >
                      More Info
                    </a>
                    .
                  </>
                }
                value={miscExpense}
                onChange={(e) => setMiscExpense(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="usage" />
              <Label htmlFor="usage">Allow usage</Label>
            </div>
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
            {showFieldsAlert && (
              <Alert color="failure" onDismiss={() => setFieldsAlert(false)}>
                <span className="font-medium">Fields alert!</span> Please fill
                out all fields with integer USD amounts
              </Alert>
            )}
          </form>
        </Accordion.Content>
      </Accordion.Panel>
      <Modal
        show={showTransportModal}
        onClose={() => setShowTransportModal(false)}
      >
        <Modal.Header>Transport Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your
            transport expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowTransportModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFlightModal} onClose={() => setShowFlightModal(false)}>
        <Modal.Header>Flight Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your flight
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowFlightModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHousingModal} onClose={() => setShowHousingModal(false)}>
        <Modal.Header>Housing Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your housing
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowHousingModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFoodModal} onClose={() => setShowFoodModal(false)}>
        <Modal.Header>Food Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your food
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowFoodModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMedicalModal} onClose={() => setShowMedicalModal(false)}>
        <Modal.Header>Medical Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your medical
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowMedicalModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showWellnessModal}
        onClose={() => setShowWellnessModal(false)}
      >
        <Modal.Header>Wellness Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your wellness
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowWellnessModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLoanModal} onClose={() => setShowLoanModal(false)}>
        <Modal.Header>Loan Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your loan
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowLoanModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEntModal} onClose={() => setShowEntModal(false)}>
        <Modal.Header>Entertainment Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your
            entertainment expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEntModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showClothingModal}
        onClose={() => setShowClothingModal(false)}
      >
        <Modal.Header>Clothing Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your clothing
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowClothingModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInsuranceModal}
        onClose={() => setShowInsuranceModal(false)}
      >
        <Modal.Header>Insurance Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your
            insurance expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowInsuranceModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showItemsModal} onClose={() => setShowItemsModal(false)}>
        <Modal.Header>Items Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your items
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowItemsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSaveModal} onClose={() => setShowSaveModal(false)}>
        <Modal.Header>Save Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your save
            expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSaveModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMiscModal} onClose={() => setShowMiscModal(false)}>
        <Modal.Header>Miscellaneous Expense Guide</Modal.Header>
        <Modal.Body>
          <p>
            Here you can find information about what to include in your
            miscellaneous expenses.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowMiscModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Accordion>
  );
}
