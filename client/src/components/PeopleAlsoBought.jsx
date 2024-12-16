import { useEffect, useState } from "react";
import axios from "../lib/axios"
import toast from "react-hot-toast"

function PeopleAlsoBought() {

	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response.data.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

  return (
    <div className="peopleAlsoBought">

    </div>
  )
}

export default PeopleAlsoBought