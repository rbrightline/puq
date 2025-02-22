# Session Entity

A **User Session** entity in a database typically stores information about a user's session while interacting with a system. The properties of a **User Session** entity depend on the application's requirements, but commonly include:

## **Core Properties:**

1. **Session ID** (`session_id`): Unique identifier for the session.
2. **User ID** (`user_id`): Foreign key referencing the user associated with the session.
3. **Device Information** (`device_info`): Stores details about the device (e.g., browser, OS, IP address).
4. **IP Address** (`ip_address`): The user's IP address during the session.
5. **Start Time** (`start_time`): Timestamp when the session was initiated.
6. **End Time** (`end_time`): Timestamp when the session ended (if applicable).
7. **Last Activity** (`last_activity`): Timestamp of the user's last action in the session.
8. **Status** (`status`): Indicates if the session is **active**, **expired**, or **terminated**.
9. **Session Token** (`session_token`): A token for authentication or validation purposes.

## **Optional Properties:**

10. **Geolocation** (`geo_location`): The approximate geographic location of the user.
11. **User Agent** (`user_agent`): Stores browser or client details.
12. **Session Expiration** (`expires_at`): Timestamp when the session is expected to expire.
13. **Multi-Factor Authentication Status** (`mfa_verified`): Whether MFA was used in the session.
14. **Session Type** (`session_type`): Could be **web, mobile, API**, etc.
15. **Referrer URL** (`referrer_url`): The URL from which the session originated.
16. **Actions Logged** (`actions`): Stores logs of actions performed during the session.

## **Relationships:**

- **User** (`user_id` → `users.id`): Links session to a specific user.
- **Logs** (`session_id` → `logs.session_id`): Links to an activity log table.
- **Tokens** (`session_id` → `auth_tokens.session_id`): Links to authentication tokens.

Would you like a database schema for this?
