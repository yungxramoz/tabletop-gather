package tabletop.gather.backend.game;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tabletop.gather.backend.plan.Plan;
import tabletop.gather.backend.user.User;

@Entity
@Table(name = "Games")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Game {

  @Id
  @Column(nullable = false, updatable = false)
  @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @GeneratedValue(generator = "uuid")
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false)
  private Integer minPlayer;

  @Column private Integer maxPlayer;

  @Column(length = 500)
  private String imageUrl;

  @ManyToMany(mappedBy = "games")
  private Set<User> users;

  @OneToMany(mappedBy = "game")
  private Set<Plan> plans;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private OffsetDateTime dateCreated;

  @LastModifiedDate
  @Column(nullable = false)
  private OffsetDateTime lastUpdated;
}
