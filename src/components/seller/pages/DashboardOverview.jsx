import React, { useEffect, useState } from "react";
import WelcomeSection from "./WelcomeSection";
import DashboardKpiCard from "./DashboardKpiCard";
import { useNavigate } from "react-router-dom";
import { useProducts, useReviews } from "../../../contexts/ProductsContext";
import { useUser } from "../../../contexts/UserContext";
import { auth } from "../../../config/firebaseConfig";

// Example static data—swap with real data from API as needed.



const DashboardOverview = () => {
  const navigate = useNavigate();
  const { product } = useProducts();
  const [rentals, setRentals] = useState(0);
  const [products , setProducts] = useState([])
  const { reviews } = useReviews();
  const {userData} = useUser()
  const [user,setUser] = useState([])

  useEffect(() => {
    setProducts(product)
    const rent = product.filter((item) => item.productsData.forRent === true);
    setRentals(rent.length);
  }, [product]);

useEffect(()=>{
  const currUser  = userData.filter((user)=>user?.userId == auth?.currentUser?.uid)
 console.log(userData)
 console.log(currUser)
  setUser(currUser[0])
},[userData])

// console.log(user?.userData.firstName)
  const KPI_DATA = [
    {
      icon: "products",
      label: "Total Products",
      value: products.length,
      linkText: "View Products",
      route: "/seller/products",
    },
    {
      icon: "rentals",
      label: "Active Rentals",
      value: rentals,
      linkText: "Manage Rentals",
      route: "/seller/rentals",
    },
    {
      icon: "reviews",
      label: "Pending Reviews",
      value: reviews.length,
      linkText: "See Feedback",
      route: "/seller/reviews",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Welcome Section */}
      <WelcomeSection sellerName={`${user?.userData?.firstName} ${user?.userData?.lastName}`} />
      {/* KPI Cards */}
      <div
        className="
          grid grid-cols-1 gap-3 sm:gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          mt-1 sm:mt-2
        "
        aria-label="Overview KPIs"
      >
        {KPI_DATA.map((kpi) => (
          <DashboardKpiCard
            key={kpi.icon}
            icon={kpi.icon}
            label={kpi.label}
            value={kpi.value}
            linkText={kpi.linkText}
            onLinkClick={() => navigate(kpi.route)}
            ariaLabel={`${kpi.label}: ${kpi.value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
