import React, { useEffect, useState } from "react";
import styles from "./GitHubActivity.module.scss";

interface GitHubActivityProps {
  username: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 для интенсивности цвета
}

interface ContributionWeek {
  days: ContributionDay[];
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({ username }) => {
  const [contributionData, setContributionData] = useState<ContributionWeek[]>(
    []
  );
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        setLoading(true);

        // В реальном приложении здесь будет запрос к GitHub GraphQL API
        // Сейчас создадим эмуляцию данных

        // Создаем фиктивные данные за последний год (52 недели)
        const mockWeeks: ContributionWeek[] = [];
        let contributions = 0;

        // Генерируем данные для 52 недель
        for (let w = 0; w < 52; w++) {
          const days: ContributionDay[] = [];

          // Генерируем данные для 7 дней недели
          for (let d = 0; d < 7; d++) {
            // Разная вероятность коммитов для разных дней недели
            const isWorkday = d < 5;
            const max = isWorkday ? 10 : 5;
            const count =
              Math.floor(Math.random() * max) * (Math.random() > 0.4 ? 1 : 0);

            // Определяем уровень (интенсивность) для отображения
            let level = 0;
            if (count > 0) {
              if (count <= 2) level = 1;
              else if (count <= 5) level = 2;
              else if (count <= 8) level = 3;
              else level = 4;
            }

            contributions += count;

            // Вычисляем дату, соответствующую данному дню
            const date = new Date();
            date.setDate(date.getDate() - ((51 - w) * 7 + (6 - d)));

            days.push({
              date: date.toISOString().split("T")[0],
              count,
              level,
            });
          }

          mockWeeks.push({ days });
        }

        setContributionData(mockWeeks);
        setTotalContributions(contributions);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
        setLoading(false);
      }
    };

    fetchGitHubContributions();
  }, [username]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.githubActivityWrapper}>
      <div className={styles.contributionGraphContainer}>
        <div className={styles.contributionGraph}>
          {contributionData.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`${styles.day} ${styles[`level${day.level}`]}`}
                  title={`${day.date}: ${day.count} контрибуций`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.profileLink}>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {totalContributions} contributions for the last year • @{username}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubActivity;
