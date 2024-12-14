import { useEffect } from "react";
import Header  from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { getMyMatches } from "../features/matchesSlice";
import { subscribeToMessages,unsubscribeFromMessages,getMessages } from "../features/messageSlice";

const Chat = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);

  const matches = useSelector((state) => state.matches.matches);
  const isLoadingMyMatches = useSelector((state) => state.matches.isLoadingMyMatches);

  const messages = useSelector((state) => state.messages.messages);
	

	const { id } = useParams();

	const match = matches.find((m) => m?._id === id);

	useEffect(() => {
    if (authUser && id) {
      dispatch(getMyMatches());
      dispatch(getMessages(id));
      dispatch(subscribeToMessages());
    }
  
    return () => {
      dispatch(unsubscribeFromMessages());
     };
  }, [dispatch, authUser, id]);

	if (isLoadingMyMatches) return <LoadingMessagesUI />;
	if (!match) return <MatchNotFound />;

	return (
		<div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
			<Header />

			<div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
				<div className='flex items-center mb-4 bg-white rounded-lg shadow p-3'>
					<img
						src={match.image || "/avatar.png"} alt="/avatar.png"
						className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-blue-300'
					/>
					<h2 className='text-xl font-semibold text-gray-800'>{match.name}</h2>
				</div>

				<div className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4'>
					{messages.length === 0 ? (
						<p className='text-center text-gray-500 py-8'>Start your conversation with {match.name}</p>
					) : (
						messages.map((msg) => (
							<div
								key={msg._id}
								className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
							>
								<span
									className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
										msg.sender === authUser._id
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-800"
									}`}
								>
									{msg.content}
								</span>
							</div>
						))
					)}
				</div>
				<MessageInput match={match} />
			</div>
		</div>
	);
};
export default Chat;

const MatchNotFound = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern'>
		<div className='bg-white p-8 rounded-lg shadow-md text-center'>
			<UserX size={64} className='mx-auto text-blue-500 mb-4' />
			<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Match Not Found</h2>
			<p className='text-gray-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
			<Link
				to='/'
				className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-blue-300 inline-block'
			>
				Go Back To Home
			</Link>
		</div>
	</div>
);

const LoadingMessagesUI = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50'>
		<div className='bg-white p-8 rounded-lg shadow-md text-center'>
			<Loader size={48} className='mx-auto text-blue-500 animate-spin mb-4' />
			<h2 className='text-2xl font-semibold text-gray-800 mb-2'>Loading Chat</h2>
			<p className='text-gray-600'>Please wait while we fetch your conversation...</p>
			<div className='mt-6 flex justify-center space-x-2'>
				<div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
				<div
					className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	</div>
);