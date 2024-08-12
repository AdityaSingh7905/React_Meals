import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItems from "./MealItems/MealItems";

const AvailableMeals = () => {
  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://reactmeals-34cac-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!!");
        }
        const responseData = await response.json();
        console.log(responseData);
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  const meals = Meals.map((meals) => (
    <MealItems
      id={meals}
      key={meals}
      description={meals.description}
      name={meals.name}
      price={meals.price}
    ></MealItems>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{meals}</ul>}
        {isLoading && !error && <p>Loading...Please Wait!!</p>}
        {error && <p>Something went Wrong!!</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
