import { Link } from "react-router-dom";

export default function DancingSnek() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className = "flex flex-row items-center justify-center">
          <img src = "/assets/gangnamsnake.gif"/>
          <div>
          <p>welome 2 hecking snecc</p>
          <p> he dance for u </p>
          <p><u><Link to = "/gallery">gallery</Link></u></p>
          </div>
          </div>
        </div>
      );
}