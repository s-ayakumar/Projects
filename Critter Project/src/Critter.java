

import java.awt.*;

public class Critter {
    public static enum Neighbor {
        WALL, EMPTY, SAME, OTHER
    };

    public static enum Action {
        HOP, LEFT, RIGHT, INFECT
    };

    public static enum Direction {
        NORTH, SOUTH, EAST, WEST
    };

    // This method should be overriden (default action is turning left)
    public Action getMove(CritterInfo info) {
        return Action.LEFT;
    }

    // This method should be overriden (default color is black)
    public Color getColor() {
        return Color.BLACK;
    }

    // This method should be overriden (default display is "?")
    public String toString() {
        return "?";
    }

    // This prevents critters from trying to redefine the definition of
    // object equality, which is important for the simulator to work properly.
    public final boolean equals(Object other) {
        return this == other;
    }
}