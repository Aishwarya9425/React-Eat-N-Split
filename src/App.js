import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Sita",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Ram",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Suresh",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setshowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    //update friends list using current friends state
    setFriends((friends) => [...friends, friend]);
    //after adding new friend close the add friend form
    setshowAddFriend(false);
  }

  function handleSelection(friend) {
    //setSelectedFriend(friend);
    //after selected, when click on close it should be reset
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    //show only one form, either add or split
    setshowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add a new friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {" "}
      {children}{" "}
    </button>
  );
}

//since friend comp is not listed in app but inside friendlist
//now friendlist is just passing down props to friend comp == PROP drilling
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  //optional chaining to check if selectedFriend exists
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* Less than 0 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} amount ₹{Math.abs(friend.balance)}
        </p>
      )}

      {/* More than 0 */}
      {friend.balance > 0 && (
        <p className="green">
          Your friend {friend.name} owes you amount ₹{Math.abs(friend.balance)}
        </p>
      )}

      {/* equal to 0 */}
      {friend.balance === 0 && (
        <p>You and your friend {friend.name} are even! </p>
      )}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Selected"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);

    //rest form
    setImage("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧍‍♀️Friend name</label>
      <input
        type="text/"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷Image</label>
      <input
        type="text/"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Save details</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setpaidByUser] = useState("");
  //derived state - friend's expense
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setwhoIsPaying] = useState("user");
  return (
    <form className="form-split-bill">
      <h2>Split a bill with friend {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input
        type="text/"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expense</label>
      <input
        type="text/"
        value={paidByUser}
        //dont let user to type more than the bill amount to avoid -
        onChange={(e) =>
          setpaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text/" disabled value={paidByFriend} />

      <label>Who is paying the bill? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
