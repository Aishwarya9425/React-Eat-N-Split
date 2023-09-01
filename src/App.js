import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setshowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    //update friends list using current friends state
    setFriends((friends) => [...friends, friend]);
    //after adding new friend close the add friend form
    setshowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add a new friend"}
        </Button>
      </div>
      <FormSplitBill />
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

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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

      <Button>Select</Button>
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with friend ABC</h2>

      <label>Bill value</label>
      <input type="text/" />

      <label>Your expense</label>
      <input type="text/" />

      <label>Your friend's expense</label>
      <input type="text/" disabled />

      <label>Who is paying the bill? </label>
      <select>
        <option value="user">You</option>
        <option value="friend">friend</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
