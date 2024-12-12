import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult";
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(json);
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);
  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") setFilteredData(null);
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type == "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  };
  const filteredBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading.....</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              type="text"
              onChange={searchFood}
              placeholder="Search Food"
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filteredBtns.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
          {/* <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button> */}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  padding-bottom: 40px;
`;

export const Button = styled.section`
  background: ${({ isSelected }) => (isSelected ? "#fe2f2f" : "#ff4343")};
  outline: ${({ isSelected }) => (isSelected ? "1px solid white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  display: flex;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #fe2f2f;
  }
`;
