import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
	// const [repositories, setRepositories] = useState();
	// const [loading, setLoading] = useState(false);
	const {
		data: { repositories },
		// eslint-disable-next-line no-unused-vars
		error,
		loading,
	} = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		// Other options
	});

	// console.log(
	// 	"REPOOOOOOOOOOOOO HEEEEEEEEEEEREEEEEEEEEEEEEEEEEEE",
	// 	repositories
	// );

	// const fetchRepositories = async () => {
	// 	setLoading(true);

	// 	// Replace the IP address part with your own IP address!
	// 	const response = await fetch("http://192.168.43.205:5000/api/repositories");
	// 	const json = await response.json();

	// 	setLoading(false);
	// 	setRepositories(json);
	// };

	// useEffect(() => {
	// 	fetchRepositories();
	// }, []);

	return { repositories, loading };
};

export default useRepositories;
