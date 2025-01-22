import cv2
import mediapipe as mp
import math

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()


# Function to calculate angle between three points
def calculate_angle(a, b, c):
    a = [a.x, a.y]
    b = [b.x, b.y]
    c = [c.x, c.y]

    ba = [a[0] - b[0], a[1] - b[1]]
    bc = [c[0] - b[0], c[1] - b[1]]

    cosine_angle = (ba[0] * bc[0] + ba[1] * bc[1]) / (
        math.sqrt(ba[0] ** 2 + ba[1] ** 2) * math.sqrt(bc[0] ** 2 + bc[1] ** 2)
    )

    angle = math.degrees(math.acos(cosine_angle))
    return angle


# Function to classify risk levels based on neck angle
def classify_risk_level(angle):
    if angle < 50:
        return "High Risk"
    elif angle < 70:
        return "Moderate Risk"
    else:
        return "Low Risk"


# Function to classify back bending risk level
def classify_back_risk(angle):
    if angle < 150:
        return "High Risk"
    elif angle < 165:
        return "Moderate Risk"
    else:
        return "Low Risk"


# Start video capture
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    # Process image and find pose landmarks
    results = pose.process(image)

    # Convert image back to BGR for rendering
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    if results.pose_landmarks:
        # Get landmark points
        landmarks = results.pose_landmarks.landmark

        # Define points for neck and back angle calculation
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        nose = landmarks[mp_pose.PoseLandmark.NOSE]
        left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

        # Define points for knee analysis
        left_knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE]
        left_ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE]

        # Calculate neck midpoint
        neck = type(
            "Point",
            (object,),
            {
                "x": (left_shoulder.x + right_shoulder.x) / 2,
                "y": (left_shoulder.y + right_shoulder.y) / 2,
            },
        )()

        # Calculate back midpoint
        back = type(
            "Point",
            (object,),
            {"x": (left_hip.x + right_hip.x) / 2, "y": (left_hip.y + right_hip.y) / 2},
        )()

        # Calculate neck angle
        neck_angle = calculate_angle(left_shoulder, neck, nose)

        # Calculate back bending angle
        back_angle = calculate_angle(left_hip, back, neck)

        # Calculate left knee bend angle
        knee_angle = calculate_angle(left_hip, left_knee, left_ankle)

        # Classify risk levels
        neck_risk_level = classify_risk_level(neck_angle)
        back_risk_level = classify_back_risk(back_angle)

        # Check for inward knee turn (threshold for x-coordinate difference)
        knee_inward_turn = abs(left_knee.x - left_hip.x) > 0.03

        # Display neck angle and risk level
        cv2.putText(
            image,
            f"Neck Angle: {int(neck_angle)} degrees",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2,
            cv2.LINE_AA,
        )
        cv2.putText(
            image,
            f"Neck Risk Level: {neck_risk_level}",
            (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 0, 255),
            2,
            cv2.LINE_AA,
        )

        # Display back angle and risk level
        cv2.putText(
            image,
            f"Back Angle: {int(back_angle)} degrees",
            (10, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2,
            cv2.LINE_AA,
        )
        cv2.putText(
            image,
            f"Back Risk Level: {back_risk_level}",
            (10, 130),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 255),
            2,
            cv2.LINE_AA,
        )

        # Display knee angle and abnormalities
        cv2.putText(
            image,
            f"Knee Angle: {int(knee_angle)} degrees",
            (10, 170),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 255, 0),
            2,
            cv2.LINE_AA,
        )
        if knee_angle < 150:
            cv2.putText(
                image,
                "Abnormal Knee Bend!",
                (10, 200),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2,
                cv2.LINE_AA,
            )
        if knee_inward_turn:
            cv2.putText(
                image,
                "Inward Knee Turn Detected!",
                (10, 230),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2,
                cv2.LINE_AA,
            )

    # Display the frame
    cv2.imshow("Posture and Gait Analysis", image)

    # Break the loop on 'q' key press
    if cv2.waitKey(10) & 0xFF == ord("q"):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
