import {
  Accordion,
  Button,
  Checkbox,
  Label,
  TextInput,
  Modal,
  Alert,
  List,
} from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";
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
  const [showSubmitAlert, setSubmitAlert] = useState(false);

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
          setSubmitAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error doing survey:", error);
      });
  }

  return (
    <Accordion collapseAll>
      <Accordion.Panel>
        <Accordion.Title>My Financial Survey</Accordion.Title>
        <Accordion.Content>
          <form className="flex max-w-md flex-col gap-4 mx-auto">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="Transport" value="Transport Expenses" />
              </div>
              <TextInput
                id="Transport"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Flight" value="Flight Expenses" />
              </div>
              <TextInput
                id="Flight"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Housing" value="Housing Expenses" />
              </div>
              <TextInput
                id="Housing"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Food" value="Food Expenses" />
              </div>
              <TextInput
                id="Food"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Medical" value="Medical Expenses" />
              </div>
              <TextInput
                id="Medical"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Wellness" value="Wellness Expenses" />
              </div>
              <TextInput
                id="Wellness"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Loan" value="Loan Expenses" />
              </div>
              <TextInput
                id="Loan"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Entertainment" value="Entertainment Expenses" />
              </div>
              <TextInput
                id="Entertainment"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Clothing" value="Clothing Expenses" />
              </div>
              <TextInput
                id="Clothing"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Insurance" value="Insurance Expenses" />
              </div>
              <TextInput
                id="Insurance"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Items" value="Items Expenses" />
              </div>
              <TextInput
                id="Items"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Save" value="Save Expenses" />
              </div>
              <TextInput
                id="Save"
                icon={AiOutlineDollarCircle}
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

              <div className="mb-2 block mt-3">
                <Label htmlFor="Misc" value="Miscellaneous Expenses" />
              </div>
              <TextInput
                id="Misc"
                icon={AiOutlineDollarCircle}
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
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
            {showFieldsAlert && (
              <Alert color="failure" onDismiss={() => setFieldsAlert(false)}>
                <span className="font-medium">Fields alert!</span> Please fill
                out all fields with integer USD amounts
              </Alert>
            )}
            {showSubmitAlert && (
              <Alert color="success" onDismiss={() => setSubmitAlert(false)}>
                <span className="font-medium">Alert!</span> Data successfully
                submitted, please reload the page to see updated chart
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
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Gas prices</List.Item>
            <List.Item>Car maintenance</List.Item>
            <List.Item>Vehicle purchase or lease payments</List.Item>
            <List.Item>Public transportation fares</List.Item>
            <List.Item>Tolls and parking fees</List.Item>
            <List.Item>Vehicle insurance premiums</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowTransportModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFlightModal} onClose={() => setShowFlightModal(false)}>
        <Modal.Header>Flight Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Flight tickets</List.Item>
            <List.Item>Baggage fees</List.Item>
            <List.Item>Travel insurance</List.Item>
            <List.Item>Airport transfers</List.Item>
            <List.Item>Visa or entry fees</List.Item>
            <List.Item>Seat upgrades</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowFlightModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHousingModal} onClose={() => setShowHousingModal(false)}>
        <Modal.Header>Housing Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Rent or mortgage payments</List.Item>
            <List.Item>Property taxes</List.Item>
            <List.Item>Utility bills (electricity, water, gas)</List.Item>
            <List.Item>Home insurance premiums</List.Item>
            <List.Item>Home maintenance and repairs</List.Item>
            <List.Item>Furniture and appliances</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowHousingModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFoodModal} onClose={() => setShowFoodModal(false)}>
        <Modal.Header>Food Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Groceries</List.Item>
            <List.Item>Dining out</List.Item>
            <List.Item>Snacks and beverages</List.Item>
            <List.Item>Meal delivery services</List.Item>
            <List.Item>Cooking supplies</List.Item>
            <List.Item>Special dietary needs</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowFoodModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMedicalModal} onClose={() => setShowMedicalModal(false)}>
        <Modal.Header>Medical Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Doctor visits</List.Item>
            <List.Item>Prescription medications</List.Item>
            <List.Item>Dental care</List.Item>
            <List.Item>Health insurance premiums</List.Item>
            <List.Item>Medical equipment</List.Item>
            <List.Item>Emergency services</List.Item>
          </List>
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
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Gym memberships</List.Item>
            <List.Item>Spa treatments</List.Item>
            <List.Item>Yoga or fitness classes</List.Item>
            <List.Item>Wellness retreats</List.Item>
            <List.Item>Mental health services</List.Item>
            <List.Item>Nutritional supplements</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowWellnessModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLoanModal} onClose={() => setShowLoanModal(false)}>
        <Modal.Header>Loan Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>
              Loan payments (e.g., personal loans, student loans)
            </List.Item>
            <List.Item>Interest charges</List.Item>
            <List.Item>Loan origination fees</List.Item>
            <List.Item>Loan insurance premiums</List.Item>
            <List.Item>Loan refinancing costs</List.Item>
            <List.Item>Late payment fees</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowLoanModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEntModal} onClose={() => setShowEntModal(false)}>
        <Modal.Header>Entertainment Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Movie tickets</List.Item>
            <List.Item>Concerts and shows</List.Item>
            <List.Item>Streaming services</List.Item>
            <List.Item>Books and magazines</List.Item>
            <List.Item>Outdoor activities</List.Item>
            <List.Item>Hobbies and interests</List.Item>
          </List>
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
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Clothing purchases</List.Item>
            <List.Item>Shoes and accessories</List.Item>
            <List.Item>Seasonal wardrobe updates</List.Item>
            <List.Item>Dry cleaning and laundry</List.Item>
            <List.Item>Clothing rentals</List.Item>
            <List.Item>Alterations and repairs</List.Item>
          </List>
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
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Health insurance premiums</List.Item>
            <List.Item>Life insurance premiums</List.Item>
            <List.Item>Auto insurance premiums</List.Item>
            <List.Item>Homeowners insurance premiums</List.Item>
            <List.Item>Rental insurance premiums</List.Item>
            <List.Item>Pet insurance premiums</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowInsuranceModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showItemsModal} onClose={() => setShowItemsModal(false)}>
        <Modal.Header>Items Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Electronics purchases</List.Item>
            <List.Item>Furniture and appliances</List.Item>
            <List.Item>Home decor items</List.Item>
            <List.Item>Personal care products</List.Item>
            <List.Item>Tools and equipment</List.Item>
            <List.Item>Artwork and collectibles</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowItemsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSaveModal} onClose={() => setShowSaveModal(false)}>
        <Modal.Header>Save Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Savings contributions</List.Item>
            <List.Item>Investment accounts</List.Item>
            <List.Item>Retirement savings</List.Item>
            <List.Item>Emergency fund savings</List.Item>
            <List.Item>Financial planning services</List.Item>
            <List.Item>Education savings</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSaveModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMiscModal} onClose={() => setShowMiscModal(false)}>
        <Modal.Header>Miscellaneous Expense Guide</Modal.Header>
        <Modal.Body>
          <p>Consider the following expenses:</p>
          <List className="py-3">
            <List.Item>Gifts and donations</List.Item>
            <List.Item>Legal fees and services</List.Item>
            <List.Item>Professional dues and subscriptions</List.Item>
            <List.Item>Childcare and dependent care</List.Item>
            <List.Item>Travel and vacation expenses</List.Item>
            <List.Item>Unexpected or emergency expenses</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowMiscModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Accordion>
  );
}
