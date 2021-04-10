import React from "react";
import { Item } from "./interfaces";
import { GenericComponent } from "./genericComponent";

interface ProfileProps {
  items: Item[];
}

export const ProfileScreen: React.FC<ProfileProps> = ({ items }) => {
  return <GenericComponent items={items} />;
};
