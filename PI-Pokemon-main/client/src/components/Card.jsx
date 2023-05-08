import React from "react";

export default function Card ({ name, image, hp,attack, defense, speed, height, weight, type,}) {
    return (
        <div>
    <img src = {image}  width = "200px" height = "250px"/>
    <h3> {name}</h3>
    <h3> {hp}</h3>
    <h3> {attack}</h3>
    <h3> {defense}</h3>
    <h3> {speed}</h3>
    <h3> {height}</h3>
    <h3> {weight}</h3>
    <h3> {type}</h3>
    </div>
    );
}
